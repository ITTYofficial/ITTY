const express = require('express')
const router = express.Router()
const Anony = require('../../schemas/community/anony')

// 글 작성
router.post('/write', async (req, res) => {
    try {

        // 해당 라우터가 정상적으로 작동하면 public/uploads에 이미지가 업로드된다.
        // 업로드된 이미지의 URL 경로를 프론트엔드로 반환한다.
        // console.log('전달받은 파일', req.file);
        // console.log('저장된 파일의 이름', req.file.filename);

        let obj;
        let _id;
        if (req.body._id) {
            // 글 수정 시
            await Anony.updateOne(
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
                title: req.body.title,
                content: req.body.content,
            };
            const anony = new Anony(obj);
            _id = anony._id
            await Anony.insertMany(anony);
        }
        res.json({
            message: true,
            _id: _id
        });
        // res.json({ message: "게시글이 업로드 되었습니다." });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});


// 글 리스트 조회
router.get('/anonyList', async (req, res) => {
    try {
        const anony = await Anony.find();
        console.log('데이터확인', anony);
        res.json({ anony })

    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
})

// id값으로 특정 글 조회
router.get("/anonyDetail/:_id", async (req, res) => {
    try {
        const id = req.params._id;
        console.log('이거?',id);
        const detailAnony = await Anony.find({
            _id: id
        });
        //   조회수 업데이트 기능
        await Anony.updateOne(
            { _id: id },
            {
                $set: {
                    views: detailAnony[0].views + 1
                }
            }
        );

        res.json({ detailAnony });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});




module.exports = router;
