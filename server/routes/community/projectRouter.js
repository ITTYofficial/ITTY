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

    // 해당 라우터가 정상적으로 작동하면 public/uploads에 이미지가 업로드된다.
    // 업로드된 이미지의 URL 경로를 프론트엔드로 반환한다.
    console.log("전달받은 태그", req.body.value);
    console.log("title", req.body.title);
    // console.log('전달받은 파일', req.file);
    // console.log('저장된 파일의 이름', req.file.filename);

    let obj;

    obj = {
      // writer: req.body.writer,
      // title: req.body.title,
      // content: req.body.content,

      writer: "gg",
      title: req.body.title,
      content: "gg",

      // 페이지 만들어지면 수정할 것
      // 글 번호는 어떤식으로 생성할 건지, 이미지 주소는 어떻게 줄일 건지 방법 찾기
      // 글 수정과 함께 동작할 수 있도록 작성할 것

      // postNum: req.body.postNum,
      // views: 0,

      // postCategory: req.body.categotry,
      // imgPath: req.body.imgPath,
      // recruitPeriod: req.body.recruitPeriod,
      // recruit: req.body.recruit
    };

    const IMG_URL = `http://localhost:8088/uploads/${req.file.filename}`;
    console.log(IMG_URL);
    res.json({ url: IMG_URL });

    const project = new Project(obj);
    await Project.insertMany(project);
    // res.json({ message: "게시글이 업로드 되었습니다." });
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

    obj = {
      writer: req.body.writer,
      title: req.body.title,
      content: req.body.content,

      // 글 작성과 함께 동작할 수 있도록 수정할 것
      // 글 수정 페이지가 작성과 함께 동작할 수 있도록 할 것
      // 글 수정시에 기존의 입력값이 그대로 남아 있을 수 있도록 조치할 것

      // postNum: req.body.postNum,
      // views: req.body.views,

      // postCategory: req.body.categotry,
      // imgPath: req.body.imgPath,
      // recruitPeriod: req.body.recruitPeriod,
      // recruit: req.body.recruit
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
    // await Project.updateOne(
    //   { _id: id },
    //   {
    //     $set:{
    //       views: detailProject[0].views+1
    //     }
    //   }
    // );

    res.json({ detailProject });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// 밑으로 수정, 삭제 등등 작성할 것

module.exports = router