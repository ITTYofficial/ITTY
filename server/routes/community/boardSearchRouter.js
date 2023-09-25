const express = require('express');
const router = express.Router();
const Comment = require('../../schemas/community/comment');
const Market = require('../../schemas/community/market');
const Play = require('../../schemas/community/play');
const Port = require('../../schemas/community/port');
const Project = require('../../schemas/community/project');
const QnA = require("../../schemas/community/qna");
const Review = require("../../schemas/community/review");
const Study = require('../../schemas/community/study');
const Tip = require("../../schemas/community/tip");


// 글 리스트 조회
router.get('/searchBoard', async (req, res) => {
    const searchTerm = req.query.searchTerm; // 검색어 받아오기

    try {
        const searchResults = await Promise.all([
            Play.find({ title: new RegExp(searchTerm, 'i') }),
            Market.find({ title: new RegExp(searchTerm, 'i') }),
            Port.find({ title: new RegExp(searchTerm, 'i') }),
            Project.find({ title: new RegExp(searchTerm, 'i') }),
            QnA.find({ title: new RegExp(searchTerm, 'i') }),
            Review.find({ title: new RegExp(searchTerm, 'i') }),
            Study.find({ title: new RegExp(searchTerm, 'i') }),
            Tip.find({ title: new RegExp(searchTerm, 'i') })
        ]);

        const allBoards = searchResults.map((posts, index) => ({
            boardType: ['Play', 'Market', 'Port', 'Project', 'QnA', 'Review', 'Study', 'Tip'][index],
            posts
        }));

        res.json({ allBoards });

    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});


module.exports = router;