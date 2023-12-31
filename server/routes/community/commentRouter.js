const express = require('express')
const router = express.Router()
const Comment = require('../../schemas/community/comment')
const Member = require('../../schemas/member/member')
const Study = require('../../schemas/community/study')
const Tip = require('../../schemas/community/tip')
const Review = require("../../schemas/community/review")
const QnA = require("../../schemas/community/qna")
const Project = require('../../schemas/community/project')
const Port = require('../../schemas/community/port');
const Play = require('../../schemas/community/play')
const Market = require('../../schemas/community/market')

const schemas = {
  study: Study,
  tip: Tip,
  review: Review,
  qna: QnA,
  project: Project,
  port: Port,
  play: Play,
  market: Market
};

// 댓글 작성
router.post('/write', async (req, res) => {

  try {
    let obj;

    obj = {
      id: req.body.id,
      postId: req.body.postid,
      writer: req.body.writer,
      content: req.body.content,
    };

    const comment = new Comment(obj);
    await Comment.insertMany(comment);

    for (const key in schemas) {
      if (req.body.boardType === key) {
        await schemas[key].updateOne(
          { _id: req.body.postid },
          {
            $inc: { comments: 1 }
          }
        )
        break;
      }
    }

    await Member.updateOne(
      { id: req.body.id },
      {
        $inc: { // $inc: 기존 필드값을 +/- 연산을 할 수 있음
          point: 1 // 일단 글쓸때마다 1포인트로 지정 
        }
      });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// 대댓글 작성
router.post('/reWrite', async (req, res) => {
  try {

    let obj;

    obj = {
      id: req.body.id,
      writer: req.body.writer,
      content: req.body.content,
      createdAt: req.body.createdAt
    };

    const commentinfo = await Comment.findOneAndUpdate(
      { _id: req.body.commentId },
      {
        $push: {
          reComment: obj
        },
        $inc: {
          comments: 1
        }
      }
    )

    for (const key in schemas) {
      if (req.body.boardType === key) {
        await schemas[key].updateOne(
          { _id: commentinfo.postId },
          {
            $inc: { comments: 1 }
          }
        )
        break;
      }
    }

    /*     await schemas[key].updateOne(
          { _id: commentinfo.postId },
          {
            $inc: { comments: 1 }
          }
        ) */
    await Member.updateOne(
      { id: req.body.id },
      {
        $inc: { // $inc: 기존 필드값을 +/- 연산을 할 수 있음
          point: 1 // 일단 글쓸때마다 1포인트로 지정 
        }
      });

    res.json({ message: true });

  } catch (err) {
    console.log(err);
    res.json({ message: false })
  }
})

// 좋아요 기능
router.post('/commentLike', async (req, res) => {
  const commentId = req.body.commentId
  const userId = req.body.userId
  try {
    let comment = await Comment.findById(commentId);

    if (comment.liker.includes(userId)) {
      comment = await Comment.findByIdAndUpdate(commentId, {
        $pull: { liker: userId },

      }, { new: true });
    } else {
      comment = await Comment.findByIdAndUpdate(commentId, {
        $push: { liker: userId }
      }, { new: true});
    }
    res.json({ liker: comment.liker })
  } catch (err) {
    console.log(err);
    res.json({ message: false })
  }
})

// QnA 채택 기능
router.post('/commentSelection', async (req, res) => {
  const commentId = req.body.commentId;
  const postId = req.body.postId;
  try {
    const existingSelections = await Comment.find({
      postId: postId,
      selection: 1
    });

    if (existingSelections.length === 0) {
      const comment = await Comment.findByIdAndUpdate(commentId, {
        $set: { selection: 1 }
      }, { new: true });
      res.json({ selection: comment.selection });
    } else {
      const commentToUpdate = existingSelections.find(selection => selection._id.toString() === commentId);
      
      if (commentToUpdate) {
        commentToUpdate.selection = 0;
        await commentToUpdate.save();
        res.json({ selection: commentToUpdate.selection });
      } else {
        res.json({ message: '이미 채택된 답변이 존재합니다.' });
      }
    }
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});


// 새로운 조회함수
router.get('/commentList', async (req, res) => {
  const postId = req.query.postId;
  try {

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
          reComment.writerInfo = reWriterInfo;
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
    res.json({ countList });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }

})

// 댓글 삭제
router.post("/delete/", async (req, res) => {
  try {
    const commentinfo = await Comment.findOneAndDelete(
      {
        _id: req.body.commentId
      }
    );


    for (const key in schemas) {
      if (req.body.boardType === key) {
        await schemas[key].updateOne(
          { _id: req.body.postId },
          {
            $inc: {
              comments: -commentinfo.comments
            }
          }
        )
        break;
      }
    }



    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// 대댓글 삭제
router.post("/deleteRecomment/", async (req, res) => {
  try {
    const index = req.body.index;
    const commentId = req.body.commentId;
    await Comment.findOneAndUpdate(
      { _id: commentId },
      {
        $set: { [`reComment.${index}`]: null },
        $inc: {
          comments: -1
        }
      }
    );
    await Comment.findOneAndUpdate(
      { _id: commentId },
      {
        $pull: { reComment: null }
      }
    );


    for (const key in schemas) {
      if (req.body.boardType === key) {
        await schemas[key].updateOne(
          { _id: req.body.postId },
          {
            $inc: {
              comments: -1
            }
          }
        )
        break;
      }
    }

    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

module.exports = router;
