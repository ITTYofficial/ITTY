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
                writer: "허광영",
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

module.exports = router;