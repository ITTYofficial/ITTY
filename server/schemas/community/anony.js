const mongoose = require('mongoose');
const { Schema } = mongoose;

const anonySchema = new Schema({

    // 게시판마다 반복되는 부분
    id: {
        type: String
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

    anonyIndex: [{
        type: String,
    }]

    // 게시판마다 달라지는 부분
})

module.exports = mongoose.model('Anony', anonySchema, 'Anony')