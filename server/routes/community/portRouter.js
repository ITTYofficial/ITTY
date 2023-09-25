const express = require('express');
const router = express.Router();
const Port = require('../../schemas/community/port');

router.post('/write', async (req, res) => {
    try {
        let obj;
        let _id;
        if (req.body._id) {
            await Port.updateOne(
                { _id: req.body._id },
                {
                    $set: {
                        title: req.body.title,
                        content: req.body.content,
                        imgPath: req.body.imgPath,
                    }
                }
            );
            _id = req.body._id
        } else {
            obj = {
                id :req.body.id,
                writer: req.body.writer,
                title: req.body.title,
                content: req.body.content,
                imgPath: req.body.imgPath,
            };
            const port = new Port(obj);
            _id = port._id
            await Port.insertMany(port);
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

// 글 리스트 조회
router.get('/portList', async (req, res) => {
    try {
        const port = await Port.find();
        res.json({ port })
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
})

// id값으로 특정 글 조회
router.get("/portDetail/:_id", async (req, res) => {
    try {
        const id = req.params._id;
        console.log(id);
        const detailPort = await Port.find({
            _id: id
        });

        //   조회수 업데이트 기능
        //   메모리 많이 처먹으니까 나중에 활성화 시킬 것
        await Port.updateOne(
            { _id: id },
            {
                $set: {
                    views: detailPort[0].views + 1
                }
            }
        );

        res.json({ detailPort });
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
        await Port.deleteOne({
            _id: id
        });
        res.json({ message: true });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

module.exports = router;