const express = require('express')
const router = express.Router()
const AnonyComment = require('../../schemas/community/anonyComment')



// 댓글 작성
router.post('/write', async (req, res) => {
    console.log('확인', req.body);
    try {
        let obj;

        obj = {
            postId: req.body.postid,
            writer: req.body.writer,
            content: req.body.content,
        };

        const anonyComment = new AnonyComment(obj);
        await AnonyComment.insertMany(anonyComment);
        res.json({ message: true });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

// 대댓글 작성
router.post('/reWrite', async (req, res) => {
    console.log('확', req.body);
    try {

        let obj;

        obj = {
            writer: req.body.writer,
            content: req.body.content,
            createdAt: req.body.createdAt
        };

        await AnonyComment.findOneAndUpdate(
            { _id: req.body.commentId },
            {
                $push: {
                    reComment: obj
                }
            }
        )

        res.json({ message: true });

    } catch (err) {
        console.log(err);
        res.json({ message: false })
    }
})


// 댓글글 리스트 조회
router.get('/anonyCommentList', async (req, res) => {
    try {
        const anonyComment = await AnonyComment.find();
        res.json({ anonyComment })
        console.log('조회성공');
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
})

// 대댓글 작성
router.post('/reWrite', async (req, res) => {
  console.log(req.body);
  try {

    let obj;

    obj = {
      writer: req.body.writer,
      content: req.body.content,
      createdAt: req.body.createdAt
    };

    await Comment.findOneAndUpdate(
      { _id: req.body.commentId },
      {
        $push: {
          reComment: obj
        }
      }
    )

    res.json({ message: true });

  } catch (err) {
    console.log(err);
    res.json({ message: false })
  }
})





module.exports = router;

