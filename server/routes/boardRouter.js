const express = require("express");
const router = express.Router();
const Board = require("../schemas/board");

// 글 삭제
// :_id값 받아오는거 확인
router.post("/delete/:_id", async (req, res) => {
  console.log('delete진입');
  try {
    const id = req.params._id;
    await Board.deleteOne({
      _id: id
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// 글 수정
router.post("/update/:_id", async (req, res) => {
  try {
    const id = req.params._id;
    await Board.updateOne(
      { _id: id },
      {
        $set: {
          content: req.body.content
        }
      }
    );
    res.json({ message: true});
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});


// 글 업로드
router.post("/write", async (req, res) => {
  try {
    let obj;

    obj = {
      writer: req.body.writer,
      title: req.body.title,
      content: req.body.content
    };

    const board = new Board(obj);
    await board.save();
    res.json({ message: "게시글이 업로드 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});


// 내가 쓴 글 목록 (사용 안했음)
router.post("/getBoardList", async (req, res) => {
  try {
    const _id = req.body._id;
    const board = await Board.find({ writer: _id }, null, {
      sort: { createdAt: -1 }
    });
    res.json({ list: board });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});


// 글 조회
router.get("/boardlist", async (req, res) => {
  try {
    const board = await Board.find();
    res.json({ board });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// id값으로 글 조회
router.get("/detail/:_id", async (req, res) => {
  try {
    const id = req.params._id;
    const detailBoard = await Board.find({
      _id: id
    });
    res.json({detailBoard});
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

module.exports = router;