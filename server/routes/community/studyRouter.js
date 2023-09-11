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
            content: req.body.content,

            // 페이지 만들어지면 수정할 것
            // 글 번호는 어떤식으로 생성할 건지, 이미지 주소는 어떻게 줄일 건지 방법 찾기
            // 글 수정과 함께 동작할 수 있도록 작성할 것

            // postNum: req.body.postNum,
            // views: 0,
            
            // postCategory: req.body.categotry,
            // imgPath: req.body.imgPath,
            // recruitPeriod: req.body.recruitPeriod,
            // recruit: req.body.recruit
        };
        const study = new Study(obj);
        await Study.insertMany(study);
        res.json({ message: "게시글이 업로드 되었습니다." });
      } catch (err) {
        console.log(err);
        res.json({ message: false });
      }
});

// 글 수정
router.post("/update/:_id", async(req, res) =>{
  try {
    const id = req.params._id;

    let obj;

    obj = {
      writer: req.body.writer,
      title: req.body.title,
      content: req.body.content,

      // 글 작성과 함께 동작할 수 있도록 수정할 것
      // 글 수정 페이지가 작성과 함께 동작할 수 있도록 할 것
      // 글 수정시에 기존의 입력값이 그대로 남아 있을 수 있도록 조치할 것

      // postNum: req.body.postNum,
      // views: 0,
      
      // postCategory: req.body.categotry,
      // imgPath: req.body.imgPath,
      // recruitPeriod: req.body.recruitPeriod,
      // recruit: req.body.recruit
    };

    await Study.updateOne(
      { _id: id },
      {
        $set: obj
      }
    );
    res.json({ message: true});
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
})

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
    res.json({detailStudy});
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// 밑으로 수정, 삭제 등등 작성할 것

module.exports = router