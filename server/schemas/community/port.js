const mongoose = require('mongoose');
const { Schema } = mongoose;

const portSchema = new Schema({

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

    // 게시판마다 달라지는 부분
    imgPath: {
        // 이미지 주소
        type: String
    }
})

module.exports = mongoose.model('Port', portSchema, 'Port')