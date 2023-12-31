const mongoose = require('mongoose');
const { Schema } = mongoose;

const marketSchema = new Schema({

    // 게시판마다 반복되는 부분
    id: {
        type: String
    },
    writer: {
        // 작성자
        type: String,
        required: true,
        // ref: "User"
    },
    title: {
        // 제목
        type: String,
        required: true
    },
    content: {
        // 내용
        type: String,
        required: true
    },
    createdAt: {
        // 작성시간
        type: Date,
        default: Date.now
    },
    views: {
        // 조회수
        type: Number,
        default: 0
    },
    comments: {
        // 댓글수
        type: Number,
        default: 0
    },

    // 게시판마다 달라지는 부분
    imgPath: {
        // 이미지 주소
        type: Array
    },
    price: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('Market', marketSchema, 'Market')