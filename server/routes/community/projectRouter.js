const express = require('express')
const router = express.Router()
const Project = require('../../schemas/community/project')
const multer = require("multer")
const path = require("path");

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

    console.log(req.body);

    obj = {

      title: req.body.title,
      writer: "gg",
      content: req.body.content,
      // createdAt: "알아서 들어감",
      // views: "알아서 들어감",
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      persons: req.body.persons,
      recruit: req.body.recruit,
      position: req.body.position,
      frameWork_front: req.body.frameWork_front,
      frameWork_back: req.body.frameWork_back,
      frameWork_db: req.body.frameWork_db,

    };

    const project = new Project(obj);
    await Project.insertMany(project);
    res.json({ message: "게시글이 업로드 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// 글 수정
router.post("/update/:_id", async (req, res) => {
  try {
    const id = req.params._id;

    let obj;

    // 글 작성과 함께 동작할 수 있도록 수정할 것
    // 글 수정 페이지가 작성과 함께 동작할 수 있도록 할 것
    // 글 수정시에 기존의 입력값이 그대로 남아 있을 수 있도록 조치할 것

    obj = {

      title: req.body.title,
      writer: "gg",
      content: req.body.content,
      // createdAt: "알아서 들어감",
      // views: "알아서 들어감",
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      persons: req.body.persons,
      recruit: req.body.recruit,
      position: req.body.position,
      frameWork_front: req.body.frameWork_front,
      frameWork_back: req.body.frameWork_back,
      frameWork_db: req.body.frameWork_db,

    };

    await Project.updateOne(
      { _id: id },
      {
        $set: obj
      }
    );
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
})

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

// 밑으로 수정, 삭제 등등 작성할 것

module.exports = router