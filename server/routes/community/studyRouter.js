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
            content: req.body.content
        };
        
        const study = new Study(obj);
        await Study.insertMany(obj);
        res.json({ message: "게시글이 업로드 되었습니다." });
      } catch (err) {
        console.log(err);
        res.json({ message: false });
      }
})

// 밑으로 수정, 삭제 등등 작성할 것

module.exports = router