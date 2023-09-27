const express = require('express')
const router = express.Router()
const Member = require('../../schemas/member/member')
const Study = require('../../schemas/community/study')
const tip = require('../../schemas/community/tip')
const Review = require("../../schemas/community/review")
const QnA = require("../../schemas/community/qna")
const Project = require('../../schemas/community/project')
const Port = require('../../schemas/community/port');
const Play = require('../../schemas/community/play')
const Market = require('../../schemas/community/market')



// 전체를 한번에?
router.get('/findMemberInfo', async (req, res) => {
    try {
        const id = req.query

        // 리스트 작성자 아이디 모음
        const writerId = [];
        let lists = [];
        // 클라이언트에서 쿼리스트링으로 문자(Study등)를 보내 일치하는 걸로 실행
        if (req.query.study == 'study') {
            lists = await Study.find({ id: id });
        } else if (req.query.tip == 'tip') {
            lists = await Tip.find({ id: id });
        } else if (req.query.review == 'review') {
            lists = await Review.find({ id: id });
        } else if (req.query.qna == 'qna') {
            lists = await QnA.find({ id: id });
        } else if (req.query.project == 'project') {
            lists = await Project.find({ id: id });
        } else if (req.query.port == 'port') {
            lists = await Port.find({ id: id });
        } else if (req.query.play == 'Play') {
            lists = await Play.find({ id: id });
        } else if (req.query.market == 'market') {
            lists = await Market.find({ id: id });
        }
        // 리스트 작성자 아이디 수집
        lists.forEach(list => {
            if (list.id) {
                writerId.push(list.id);
            }
        });
        // 작성자 정보 일괄 조회    
        const writerInfos = await Member.find({ id: { $in: writerId } });
        const getWriterInformation = lists.map(list => {
            const writerInfo = writerInfos.find(info => info.id === list.id);

            return {
                ...list.toJSON(),
                writerInfo: writerInfo.toJSON(),
            };
        });
        res.json({ lists: getWriterInformation });
    } catch (err) {
        console.log('에러 : ', err);
        res.json({ message: false })
    }
});











module.exports = router