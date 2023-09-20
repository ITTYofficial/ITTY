const express = require('express')
const router = express.Router()
const Comment = require('../../schemas/community/comment')

// 댓글 작성
router.post('/write', async (req, res) => {
  console.log(req.body);
    try {
        let obj;

        obj = {
            postId: req.body.postid,
            writer: "허광영",
            content: req.body.content,
        };

        const comment = new Comment(obj);
        await Comment.insertMany(comment);
        res.json({ message: true });
      } catch (err) {
        console.log(err);
        res.json({ message: false });
      }
});

// 댓글 리스트 조회
router.get('/commentList', async (req, res) => {
  const postId = req.query.postId;
  try {
    const comment = await Comment.find({postId: postId});    
    res.json({ comment })
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
})

// 댓글 삭제
router.get("/delete/:_id", async (req, res) => {
  console.log('delete진입');
  try {
    const id = req.params._id;
    await Comment.deleteOne({
      _id: id
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});


module.exports = router;
