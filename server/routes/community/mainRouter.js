const express = require('express')
const router = express.Router()
const Play = require('../../schemas/community/play')
const Project = require('../../schemas/community/project')
const Study = require('../../schemas/community/study')
const Market = require('../../schemas/community/market')
const Port = require('../../schemas/community/port');
const Member =require('../../schemas/member/member');
router.get('/mainList', async (req, res) => {
    try {
        const mainLists = await Promise.all([
            Play.find().sort({ _id: -1 }).limit(5),
            Market.find().sort({ _id: -1 }).limit(15),
            Project.find().sort({ _id: -1 }).limit(5),
            Study.find().sort({ _id: -1 }).limit(5),
            Port.find().sort({ _id: -1 }).limit(8)
        ])
        // 리스트 작성자 아이디 수집
        let writerId = [];
        mainLists.forEach(list => {
            list.forEach(item => {
                if (item.id) {
                    writerId.push(item.id);
                }
            });
        });
        // 작성자 정보 일괄 조회    
        const writerInfos = await Member.find({ id: { $in: writerId } });
        const getWriterInformation = mainLists.map(list => {
            return list.map(item => {
                const writerInfo = writerInfos.find(info => info.id === item.id);
                return {
                    ...item.toObject(),
                    writerInfo: writerInfo ? writerInfo.toObject() : null,
                };
            });
        });
        //프로젝트 + 스터디 합치는 로직
        const proStu1 = mainLists[2].concat(mainLists[3]).slice(0, 10);

        
        proStu1.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        })
        
        const proStu = proStu1.slice(0,5);
        

        // 프로젝트 +스터디 작성자 정보 조회
        const proStuWriterInfo = proStu.map(item => {
            const writerInfo = writerInfos.find(info => info.id === item.id);
            return {
                ...item.toObject(),
                writerInfo: writerInfo ? writerInfo.toObject() : null,
                type: item instanceof Project ? 'project' : 'study' // 프젝, 스터디 구분
            };
        });

        const main = {
            play: getWriterInformation[0],
            market: getWriterInformation[1],
            proStu: proStuWriterInfo,
            port: getWriterInformation[4]
        }
        res.json({ main })
    } catch (err) {

    }
});


module.exports = router