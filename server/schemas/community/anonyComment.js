const mongoose = require('mongoose');
const { Schema } = mongoose;

const anonyCommentSchema = new Schema({

    postId:{
        // 글 ID
        type: String,
        required: true
    },
    writer: {
        // 작성자
        type: String,
        required: true,
        // ref: "User"
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
    reComment: {
        // 대댓글
        type: Array
    }
    // 게시판마다 달라지는 부분
})

module.exports = mongoose.model('AnonyComment', anonyCommentSchema, 'AnonyComment')