const express = require('express')
const router = express.Router()
const Play = require('../../schemas/community/play')
const Member = require('../../schemas/member/member')
// 글 작성
router.post('/write', async (req, res) => {
  try {

    // 해당 라우터가 정상적으로 작동하면 public/uploads에 이미지가 업로드된다.
    // 업로드된 이미지의 URL 경로를 프론트엔드로 반환한다.


    let obj;
    let _id;

    if (req.body._id) {
      // 글 수정 시
      await Play.updateOne(
        { _id: req.body._id },
        {
          $set: {
            title: req.body.title,
            content: req.body.content,
          }
        }
      );
      _id = req.body._id;
    } else {
      // 글 작성 시
      obj = {
        id: req.body.id,
        writer: req.body.writer,
        title: req.body.title,
        content: req.body.content,
      };
      const play = new Play(obj);
      _id = play._id
      await Play.insertMany(play);

      await Member.updateOne(
        { id: req.body.id },
        {
          $inc: { // $inc: 기존 필드값을 +/- 연산을 할 수 있음
            point: 1 // 일단 글쓸때마다 1포인트로 지정 
          }
        });
    }
    res.json({
      message: true,
      _id: _id,
      id: req.body.id
    });
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
    const detailPlay = await Play.find({
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

// 글 삭제
router.post("/delete/:_id", async (req, res) => {
  try {
    const id = req.params._id;
    await Play.deleteOne({
      _id: id
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

module.exports = router