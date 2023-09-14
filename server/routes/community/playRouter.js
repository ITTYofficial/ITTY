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
        // console.log('전달받은 파일', req.file);
        // console.log('저장된 파일의 이름', req.file.filename);

        let obj;

        if(req.body._id){
            // 글 수정 시
            await Play.updateOne(
                { _id: req.body._id},
                {
                  $set: {
                    title: req.body.title,
                    content: req.body.content,
                  }
                }
              );
        }else{
            // 글 작성 시
            obj = {
                writer: "gg",
                title: req.body.title,
                content: req.body.content,
            };
            const play = new Play(obj);
            await Play.insertMany(play);
        }

        res.json({ message : true});
        // res.json({ message: "게시글이 업로드 되었습니다." });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

// 글 리스트 조회
router.get('/playList', async (req, res) => {
    try {
        const play = await Play.find();
        res.json({ play })
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
})

// id값으로 특정 글 조회
router.get("/playboardDetail/:_id", async (req, res) => {
    try {
      const id = req.params._id;
      console.log(id);
      const detailPlay= await Play.find({
        _id: id
      });
  
    //   조회수 업데이트 기능
    //   메모리 많이 처먹으니까 나중에 활성화 시킬 것
      await Play.updateOne(
        { _id: id },
        {
          $set: {
            views: detailPlay[0].views + 1
          }
        }
      );
  
      res.json({ detailPlay });
    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
  });

module.exports = router