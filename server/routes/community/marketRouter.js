const express = require('express')
const router = express.Router()
const Market = require('../../schemas/community/market')
const Member = require('../../schemas/member/member')

// 글 작성
router.post('/write', async (req, res) => {
  try {
    let obj;
    let _id;
    if (req.body._id) {
      await Market.updateOne(
        { _id: req.body._id },
        {
          $set: {
            title: req.body.market_title,
            content: req.body.content,
            imgPath: req.body.imgPath,
            price: req.body.market_price,
            condition: req.body.market_condition
          }
        }
      );
      _id = req.body._id
    } else {
      obj = {
        id: req.body.id,
        writer: req.body.writer,
        title: req.body.market_title,
        content: req.body.content,
        imgPath: req.body.imgPath,
        price: req.body.market_price,
      };
      const market = new Market(obj);
      _id = market._id
      await Market.insertMany(market);
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
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// 글 리스트 조회
router.get('/marketList', async (req, res) => {
  try {
    const market = await Market.find();
    res.json({ market })
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
})

// id값으로 특정 글 조회
router.get("/marketDetail/:_id", async (req, res) => {
  try {
    const id = req.params._id;
    const detailMarket = await Market.find({
      _id: id
    });

    //   조회수 업데이트 기능
    //   메모리 많이 처먹으니까 나중에 활성화 시킬 것
    await Market.updateOne(
      { _id: id },
      {
        $set: {
          views: detailMarket[0].views + 1
        }
      }
    );

    res.json({ detailMarket });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// 글 삭제
router.post("/delete/:_id", async (req, res) => {
  try {
    const id = req.params._id;
    await Market.deleteOne({
      _id: id
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// 판매완료 전환
router.get("/sold/:_id", async (req, res) => {
  try {
    const id = req.params._id;
    await Market.findByIdAndUpdate(
      id,
      {
        $mul: {
          sold: -1
        }
      }
    )
    res.json({ message: true })
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
})
module.exports = router;