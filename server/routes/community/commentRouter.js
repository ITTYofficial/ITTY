const express = require('express')
const router = express.Router()
const Comment = require('../../schemas/community/comment')
const Member = require('../../schemas/member/member')

// 댓글 작성
router.post('/write', async (req, res) => {
  console.log('확인', req.body);
  try {
    let obj;

    obj = {
      id : req.body.id,
      postId: req.body.postid,
      writer: req.body.writer,
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

// 대댓글 작성
router.post('/reWrite', async (req, res) => {
  console.log(req.body);
  try {

    let obj;

    obj = {
      id : req.body.id,
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

// 새로운 조회함수

router.get('/commentList', async (req, res) => {
  console.time('소요시간');
  const postId = req.query.postId;
  try {
    console.log('댓글 리스트 도착', postId);

    // 댓글 및 대댓글 작성자 아이디 모음
    const writerIds = [];

    const comments = await Comment.find({ postId: postId });

    // 댓글 작성자 아이디 수집
    comments.forEach(comment => {
      if (comment.id) {
        writerIds.push(comment.id);
      }
      if (comment.reComment) {
        comment.reComment.forEach(reComment => {
          if (reComment.id) {
            writerIds.push(reComment.id);
          }
        });
      }
    });

    // 작성자 정보 일괄 조회
    const writerInfos = await Member.find({ id: { $in: writerIds } });

    const getWriterInformation = comments.map(comment => {
      const writerInfo = writerInfos.find(info => info.id === comment.id);
      if (comment.reComment) {
        comment.reComment.forEach(reComment => {
          const reWriterInfo = writerInfos.find(info => info.id === reComment.id);
          reComment.writerInfo = reWriterInfo.toJSON();
        });
      }

      return {
        ...comment.toJSON(),
        writerInfo: writerInfo ? writerInfo.toJSON() : null
      };
    });

    res.json({
      comments: getWriterInformation,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
  console.timeEnd('소요시간');
})

// 리스트 페이지용 댓글 개수 카운팅
router.post("/commentCount", async (req, res) => {
  const idList = req.body;

  try {
    const promises = idList.map(async (i) => {
      const comment = await Comment.find({ postId: i });
      let count = comment.length;
      for (const j of comment) {
        count += j.reComment.length;
      }
      return count;
    });

    const countList = await Promise.all(promises);
    console.log(countList);
    res.json({ countList });
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

// 대댓글 삭제
router.post("/deleteRecomment/", async (req, res) => {
  console.log('deleteReComment진입');
  try {
    const index = req.body.index;
    const commentId = req.body.commentId;
    await Comment.findOneAndUpdate(
      { _id: commentId },
      {
        $set: { [`reComment.${index}`]: null }
      }
    );
    await Comment.findOneAndUpdate(
      { _id: commentId },
      {
        $pull: { reComment: null }
      }
    );
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

module.exports = router;
