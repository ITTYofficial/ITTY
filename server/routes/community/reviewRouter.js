const express = require("express");
const router = express.Router();
const Review = require("../../schemas/community/review")

// 글 작성
router.post('/write', async (req, res) => {
    try {

        let obj;
        let _id;

        if (req.body._id) {
            // 글 수정 시
            obj = {

                title: req.body.title,
                writer: "gg",
                content: req.body.content,
                // createdAt: "알아서 들어감",
                // views: "알아서 들어감",
                score: req.body.score,
                keyWord: req.body.keyWord
            };
            _id = req.body._id

            await Review.updateOne(
                { _id: req.body._id },
                {
                    $set: obj
                }
            );
        } else {
            // 글 작성 시
            obj = {

                title: req.body.title,
                writer: "gg",
                content: req.body.content,
                // createdAt: "알아서 들어감",
                // views: "알아서 들어감",
                score: req.body.score,
                keyWord: req.body.keyWord
            };
            const review = new Review(obj);
            _id = review._id;
            await Review.insertMany(review);
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
        await Review.deleteOne({
            _id: id
        });
        res.json({ message: true });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

// 글 리스트 조회
router.get("/reviewList", async (req, res) => {
    try {
        const review = await Review.find();
        res.json({ review });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

// id값으로 특정 글 조회
router.get("/reviewDetail/:_id", async (req, res) => {
    try {
        const id = req.params._id;
        const detailReview = await Review.find({
            _id: id
        });

        // 조회수 업데이트 기능
        // 메모리 많이 처먹으니까 나중에 활성화 시킬 것
        await Review.updateOne(
            { _id: id },
            {
                $set: {
                    views: detailReview[0].views + 1
                }
            }
        );

        res.json({ detailReview });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

module.exports = router;