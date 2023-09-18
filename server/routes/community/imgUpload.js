const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require("path");


router.use(express.json());

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

// 글 임시 저장
router.post('/save', upload.single('img'), (req, res) => {
  console.log("save");
  try {
    const IMG_URL = `http://localhost:8088/uploads/${req.file.filename}`;
    res.json({ url: IMG_URL });
  } catch (err) {
    console.log("실패", err);
  }
});

// 글 임시 저장 마켓 용
router.post('/marketsave', upload.single('img'), (req, res) => {
  try {
    console.log(req.file);
    const IMG_URL = `http://localhost:8088/uploads/${req.file.filename}`;
    res.json({ url: IMG_URL });
  } catch (err) {
    console.log("실패", err);
  }
});

module.exports = router