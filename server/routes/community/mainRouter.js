const express = require('express')
const router = express.Router()
const Play = require('../../schemas/community/play')
const Project = require('../../schemas/community/project')
const Study = require('../../schemas/community/study')
const Market = require('../../schemas/community/market')
const Port = require('../../schemas/community/port');

router.get('/mainList', async (req, res) => {
    try {
        const mainList = await Promise.all([
            Play.find().sort({ _id: -1 }).limit(5),
            Market.find().sort({ _id: -1 }).limit(15),
            Project.find().sort({ _id: -1 }).limit(5),
            Study.find().sort({ _id: -1 }).limit(5),
            Port.find().sort({ _id: -1 }).limit(15)
        ])

        const proStu = mainList[2].concat(mainList[3]).slice(0, 5);
        
        proStu.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        })

        const main = {
            play: mainList[0],
            market: mainList[1],
            proStu: proStu,
            port: mainList[4]
        }
        res.json({ main })
    } catch (err) {

    }
});


module.exports = router