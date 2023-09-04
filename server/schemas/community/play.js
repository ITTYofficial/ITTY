const mongoose = require('mongoose');
const { Schema } = mongoose;

const playSchema = new Schema({

    // 게시판마다 반복되는 부분
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
    postNum: {
        // 글넘버
        type: Number
    },
    createdAt: {
        // 작성시간
        type: Date,
        default: Date.now
    },
    views: {
        // 조회수
        type: Number
    }
    
    // 게시판마다 달라지는 부분
})

module.exports = mongoose.model('Market', playSchema, 'Market')