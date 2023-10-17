const express = require('express')
const router = express.Router()
const Project = require('../../schemas/community/project')
const multer = require("multer")
const path = require("path");
const Member = require('../../schemas/member/member')

// multer 설정
const upload = multer({
  storage: multer.diskStorage({
    // 저장할 장소
    destination(req, file, cb) {
      cb(null, 'public/uploads');
    },
    // 저장할 이미지의 파일명
    filename(req, file, cb) {
      const ext = path.extname(file.originalname); // 파일의 확장자
      console.log('file.originalname', file.originalname);
      // 파일명이 절대 겹치지 않도록 해줘야한다.
      // 파일이름 + 현재시간밀리초 + 파일확장자명
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  // limits: { fileSize: 5 * 1024 * 1024 } // 파일 크기 제한
});

// 글 작성
router.post('/write', upload.single('img'), async (req, res) => {
  try {

    let obj;
    let _id;

    if (req.body._id) {
      // 글 수정 시
      obj = {
        id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        // createdAt: "알아서 들어감",
        // views: "알아서 들어감",
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        persons: req.body.persons,
        recruit: req.body.recruit,
        position: req.body.position,
        framework_front: req.body.framework_front,
        framework_back: req.body.framework_back,
        framework_db: req.body.framework_db,

      };
      _id = req.body._id

      await Project.updateOne(
        { _id: req.body._id },
        {
          $set: obj
        }
      );
    } else {
      // 글 작성 시
      obj = {
        id: req.body.id,
        title: req.body.title,
        writer: req.body.writer,
        content: req.body.content,
        // createdAt: "알아서 들어감",
        // views: "알아서 들어감",
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        persons: req.body.persons,
        recruit: req.body.recruit,
        position: req.body.position,
        framework_front: req.body.framework_front,
        framework_back: req.body.framework_back,
        framework_db: req.body.framework_db,

      };
      const project = new Project(obj);
      _id = project._id;
      await Project.insertMany(project);
      await Member.updateOne(
        { id: req.body.id },
        {
          $inc: { // $inc: 기존 필드값을 +/- 연산을 할 수 있음
            point: 1 // 일단 글쓸때마다 1포인트로 지정 
          }
        });
    }
    res.json({
      message: true,
      _id: _id,
      id: req.body.id
    });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// 글 삭제
router.post("/delete/:_id", async (req, res) => {
  console.log('delete진입');
  try {
    const id = req.params._id;
    await Project.deleteOne({
      _id: id
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// 글 리스트 조회
router.get("/projectList", async (req, res) => {
  try {
    const project = await Project.find();
    res.json({ project });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// id값으로 특정 글 조회
router.get("/projectDetail/:_id", async (req, res) => {
  try {
    const id = req.params._id;
    const detailProject = await Project.find({
      _id: id
    });

    // 조회수 업데이트 기능
    // 메모리 많이 처먹으니까 나중에 활성화 시킬 것
    await Project.updateOne(
      { _id: id },
      {
        $set: {
          views: detailProject[0].views + 1
        }
      }
    );

    res.json({ detailProject });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// 모집 상태 변경
router.post('/recruit', async (req, res) => {
  const postId = req.body.postId;
  try {
    const detailProject = await Project.findOneAndUpdate(
      { _id: postId },
      {
        $mul: {
          recruit: -1
        }
      }
    )
    res.json({ detailProject })
  } catch (err) {
    console.log(err);
    res.json({ message: false })
  }
})

module.exports = router