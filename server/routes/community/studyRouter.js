const express = require('express')
const router = express.Router()
const Study = require('../../schemas/community/study')

// 글 작성
router.post('/write', async (req, res) => {
    console.log('Study 글 작성');
    try {
        let obj;

        obj = {
            writer: req.body.writer,
            title: req.body.title,
            content: req.body.content,

            // 페이지 만들어지면 수정할 것
            // 글 번호는 어떤식으로 생성할 건지, 이미지 주소는 어떻게 줄일 건지 방법 찾기
            // postNum: req.body.postNum,
            // views: 0,
            
            // postCategory: req.body.categotry,
            // imgPath: req.body.imgPath,
            // recruitPeriod: req.body.recruitPeriod,
            // recruit: req.body.recruit
        };
        
        const study = new Study(obj);
        await Study.insertMany(obj);
        res.json({ message: "게시글이 업로드 되었습니다." });
      } catch (err) {
        console.log(err);
        res.json({ message: false });
      }
});

// 글 수정
router.post("/update/:_id", async(req, res) =>{
  
})

// 밑으로 수정, 삭제 등등 작성할 것

module.exports = router