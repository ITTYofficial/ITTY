const express = require('express')
const router = express.Router()
const Comment = require('../../schemas/community/comment')

// 댓글 작성
router.post('/write', async (req, res) => {
    try {
        let obj;

        obj = {
            postid: "가져온 값",
            writer: "허허",
            content: "편해요. 그냥 편함 ㅋㅋ",
            commentNum: 6,
            createdAt: "2023-09-08 12:50",
        };
        const comment = new Comment(obj);
        await Comment.insertMany(comment);
        res.json({ message: "게시글이 업로드 되었습니다." });
      } catch (err) {
        console.log(err);
        res.json({ message: false });
      }
});


module.exports = router;
