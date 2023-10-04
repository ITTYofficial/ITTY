const express = require('express')
const router = express.Router()
const Study = require('../../schemas/community/study')
const Member = require('../../schemas/member/member')

// 글 작성
router.post('/write', async (req, res) => {
  try {
    let obj;
    let _id;

    if (req.body._id) {
      // 글 수정 시
      obj = {
        title: req.body.title,
        content: req.body.content,
        persons: req.body.persons,
        recruit: req.body.recruit,
        periodStart: req.body.startDate,
        periodEnd: req.body.endDate,
        selectedValues: req.body.selectedValues
        // views: 0,      
      };
      _id = req.body._id

      await Study.updateOne(
        { _id: req.body._id },
        {
          $set: obj
        }
      );
    } else {
      // 글 작성 시
      obj = {
        id: req.body.id,
        writer: req.body.writer,
        title: req.body.title,
        content: req.body.content,
        persons: req.body.persons,
        recruit: req.body.recruit,
        periodStart: req.body.startDate,
        periodEnd: req.body.endDate,
        selectedValues: req.body.selectedValues
        // views: 0,
      };
      const study = new Study(obj);
      _id = study._id;
      await Study.insertMany(study);
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
      _id: _id
    });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }

});


// 글 삭제
router.post("/delete/:_id", async (req, res) => {
  console.log('delete진입');
  try {
    const id = req.params._id;
    await Study.deleteOne({
      _id: id
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// 글 조회
router.get("/studylist", async (req, res) => {
  try {
    const study = await Study.find();
    res.json({ study });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// id값으로 글 조회
router.get("/detail/:_id", async (req, res) => {
  try {
    const id = req.params._id;
    const detailStudy = await Study.find({
      _id: id
    });

    // 조회수 업데이트 기능
    // 메모리 많이 처먹으니까 나중에 활성화 시킬 것
    await Study.updateOne(
      { _id: id },
      {
        $set: {
          views: detailStudy[0].views + 1
        }
      }
    );

    res.json({ detailStudy });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// 모집 상태 변경
router.post('/recruit', async (req, res) => {
  const postId = req.body.postId;
  try {
    const study = await Study.findOneAndUpdate(
      {_id: postId},
      {
        $mul: {
          recruit: -1
        }
      }
    )
    res.json({ study })
  } catch (err) {
    console.log(err);
    res.json({ message: false })
  }
})

module.exports = router