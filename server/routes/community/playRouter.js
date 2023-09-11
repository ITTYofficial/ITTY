const express = require('express')
const router = express.Router()
const Play = require('../../schemas/community/play')
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

// 글 임시 저장
router.post('/save', upload.single('img'), (req, res) => {
    try {
        const IMG_URL = `http://localhost:8088/uploads/${req.file.filename}`;
        res.json({ url: IMG_URL });
    } catch (err) {
        console.log("실패", err);
    }
});

// 글 작성
router.post('/write', async (req, res) => {
    try {

        // 해당 라우터가 정상적으로 작동하면 public/uploads에 이미지가 업로드된다.
        // 업로드된 이미지의 URL 경로를 프론트엔드로 반환한다.
        console.log("전달받은 태그", req.body.content);
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
            content: req.body.content,

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

        //   const IMG_URL = `http://localhost:8088/uploads/${req.file.filename}`;
        //   console.log(IMG_URL);
        //   res.json({ url: IMG_URL });

        const play = new Play(obj);
        await Play.insertMany(play);
        res.json({ message : true});
        // res.json({ message: "게시글이 업로드 되었습니다." });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

router.get('/playList', async (req, res) => {
    try {
        const play = await Play.find();
        res.json({ play })
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
})

module.exports = router