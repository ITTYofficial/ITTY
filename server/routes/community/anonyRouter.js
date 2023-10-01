const express = require('express')
const router = express.Router()
const Anony = require('../../schemas/community/anony')
const AnonyComment = require('../../schemas/community/anonyComment')
const Member = require('../../schemas/member/member')
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
        /* console.log('데이터확인', anony); */
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
        console.log('이거?', id);
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

// 글 삭제
router.post("/delete/:_id", async (req, res) => {
    try {
        const id = req.params._id;
        await Anony.deleteOne({
            _id: id
        });
        res.json({ message: true });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});



// 댓글 함수댓글 함수댓글 함수댓글 함수댓글 함수댓글 함수댓글 함수댓글 함수댓글 함수댓글 함수댓글 함수댓글 함수댓글 함수댓글 함수

// 댓글 작성
/* router.post('/commentWrite', async (req, res) => {
    console.log('확인', req.body);
    try {
        const writer = req.body.writer;
        const postId = req.body.postId;

        // 해당 게시물에 댓글 단 기록 확인



        const checkCommentIndex = await AnonyComment.find({
            postId,
            $or: [
                { writer: writer },
                { 'reComment.writer': writer }
            ]
        });
        console.log('기록 확인', checkCommentIndex);
        if (checkCommentIndex.length === 0) {
            // 댓글 단적 없으면
            console.log('조건문 진입?');
            checkPostIndex = await Anony.findByIdAndUpdate(postId, {
                $inc: { anonymousIndex: 1 }
            });
            console.log('체크', checkPostIndex.anonymousIndex);
            anonyIndex = checkPostIndex.anonymousIndex;
        } else {
            anonyIndex = checkCommentIndex[0].anonymousIndex;
        }


        console.log('익명 순번 확인', anonyIndex);

        let obj = {
            postId: postId,
            writer: writer,
            content: req.body.content,
            anonymousIndex: anonyIndex,
        };

        const anonyComment = new AnonyComment(obj);
        await AnonyComment.insertMany(anonyComment);

        res.json({ message: true });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
}); */

router.post('/commentWrite', async (req, res) => {
    console.log('확인', req.body);
    try {
        const writer = req.body.writer;
        const postId = req.body.postId;

        const post = await Anony.findById(postId);
        // 작성자의 ID가 anonyIndex에 이미 있는지 확인

        if (!post.anonyIndex.includes(writer)) {
            // 없으면 작성자 ID를 anonyIndex에 추가
            await Anony.findByIdAndUpdate(postId, { $push: { anonyIndex: writer } });
        }

        // 다시 조회 ->(안하면 첫 댓글 무적권 인덱스 못찾아서 -1로들어감)
        const updatedPost = await Anony.findById(postId);

        // 작성자의 anonyIndex를 가져와서 anonymousIndex에 저장
        const anonymousIndex = updatedPost.anonyIndex.indexOf(writer);
        console.log('어나니인덱스', anonymousIndex);

        let obj = {
            postId: postId,
            writer: writer,
            content: req.body.content,
            anonymousIndex: anonymousIndex
        };

        const anonyComment = new AnonyComment(obj);
        await anonyComment.save(); // 댓글 망고에 저장

        await Anony.updateOne(
            { _id: postId },
            {
                $inc: { comments: 1 }
            }
        )

        res.json({ message: true });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});





// 대댓글 작성
router.post('/reCommentWrite', async (req, res) => {
    console.log('확', req.body);
    try {
        const writer = req.body.writer;
        const postId = req.body.postId;

        const post = await Anony.findById(postId);
        // 작성자의 ID가 anonyIndex에 이미 있는지 확인

        if (!post.anonyIndex.includes(writer)) {
            // 없으면 작성자 ID를 anonyIndex에 추가
            await Anony.findByIdAndUpdate(postId, { $push: { anonyIndex: writer } });
        }

        // 다시 조회 ->(안하면 첫 댓글 무적권 인덱스 못찾아서 -1로들어감)
        const updatedPost = await Anony.findById(postId);

        // 작성자의 anonyIndex를 가져와서 anonymousIndex에 저장
        const anonymousIndex = updatedPost.anonyIndex.indexOf(writer);
        console.log('어나니인덱스', anonymousIndex);


        let obj = {
            writer: writer,
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
        );

        await Anony.updateOne(
            { _id: postId },
            {
                $inc: { comments: 1 }
            }
        )

        res.json({ message: true });

    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});



// 댓글 리스트 조회
router.get('/anonyCommentList', async (req, res) => {
    try {
        console.log('조회함수 확인', req.query.postId);
        const postId = req.query.postId;
        const anonyComment = await AnonyComment.find({ postId: postId });
        res.json({ anonyComment })
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
})

// 댓글 삭제
router.post("/commentdelete", async (req, res) => {
    console.log('delete진입');
    try {
        const commentinfo = await AnonyComment.findOneAndDelete(
            {
                _id: req.body.commentId
            }
        );
        await Anony.updateOne(
            { _id: req.body.postId },
            {
                $inc: {
                    comments: -commentinfo.comments
                }
            }
        )
        res.json({ message: true });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});


// 대댓글 삭제
router.post("/deleteRecomment/", async (req, res) => {
    console.log('deleteReComment진입');
    try {
        const index = req.body.index;
        const commentId = req.body.commentId;
        const postId = req.body.postId;
        await AnonyComment.findOneAndUpdate(
            { _id: commentId },
            {
                $set: { [`reComment.${index}`]: null }
            }
        );
        await AnonyComment.findOneAndUpdate(
            { _id: commentId },
            {
                $pull: { reComment: null }
            }
        );
        await Anony.updateOne(
            { _id: postId },
            {
                $inc: {
                    comments: -1
                }
            }
        )
        res.json({ message: true });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});



module.exports = router;
