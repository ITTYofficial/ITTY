const express = require('express')
const router = express.Router()
const Play = require('../../schemas/community/play')
const Project = require('../../schemas/community/project')
const Study = require('../../schemas/community/study')
const Market = require('../../schemas/community/market')

router.get('/mainList', async (req, res) => {
    try {
        const play = await Play.find().sort({ _id: -1 }).limit(5);
        const market = await Market.find().sort({ _id: -1}).limit(4);
        const project = await Project.find().sort({ _id: -1 }).limit(5);
        const study = await Study.find().sort({ _id: -1 }).limit(5);
        const proStu = project.concat(study).slice(0, 5);

        const main = {
            play: play,
            market: market,
            proStu: proStu
        }

        res.json({ main })
    } catch (err) {

    }
});


module.exports = router