const express = require('express')
const router = express.Router()
const AnonyComment = require('../../schemas/community/anonyComment')
const Member = require('../../schemas/member/member')

// 익명 순번을 위한
let anonymousIndexMap = {};

// 게시판마다 익명 순번을 초기화하는 함수
function initializeAnonymousIndex(boardId) {
  anonymousIndexMap[boardId] = {};
}

// 댓글 작성
router.post('/write', async (req, res) => {
  try {

    const postId = req.body.postId;
    if (!anonymousIndexMap.hasOwnProperty(postId)) {
      initializeAnonymousIndex(postId);
    }

    const writer = req.body.writer;
    let anonymousIndex;

    // 만약 전에 댓글을 작성했으면 동일한 index
    if (anonymousIndexMap.hasOwnProperty(writer)) {   // hasOwnProperty -> 객체가 특정 값 가지고있는지 확인
      anonymousIndex = anonymousIndexMap[writer];
    } else {
      anonymousIndex = Object.keys(anonymousIndexMap).length; // 새로운 writer의 경우, 새로운 익명 Index 부여
      anonymousIndexMap[writer] = anonymousIndex; // writer와 익명 Index를 매핑
    }


    let obj;

    obj = {
      postId: req.body.postid,
      writer: req.body.writer,
      content: req.body.content,
      anonymousIndex: anonymousIndex,
    };

    const anonyComment = new AnonyComment(obj);
    await AnonyComment.insertMany(anonyComment);
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

    const writer = req.body.writer;
    let anonymousIndex;

    // 만약 전에 댓글을 작성했으면 동일한 index
    if (anonymousIndexMap.hasOwnProperty(writer)) {
      anonymousIndex = anonymousIndexMap[writer];
    } else {
      anonymousIndex = Object.keys(anonymousIndexMap).length;
      anonymousIndexMap[writer] = anonymousIndex;
    }


    let obj;

    obj = {
      writer: req.body.writer,
      content: req.body.content,
      createdAt: req.body.createdAt,
      anonymousIndex: anonymousIndex
    };

    await AnonyComment.findOneAndUpdate(
      { _id: req.body.commentId },
      {
        $push: {
          reComment: obj
        }
      }
    )
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


// 댓글 리스트 조회
router.get('/anonyCommentList', async (req, res) => {
  try {
    const postId = req.query.postId;
    const anonyComment = await AnonyComment.find({ postId: postId });
    res.json({ anonyComment })
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
})

// 대댓글 작성
router.post('/reWrite', async (req, res) => {
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

