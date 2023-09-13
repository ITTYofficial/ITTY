const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({

    postid:{
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
    commentNum: {
        // 댓글넘버
        type: Number
    },
    createdAt: {
        // 작성시간
        type: Date,
        default: Date.now
    },
    // 게시판마다 달라지는 부분
})

module.exports = mongoose.model('Comment', commentSchema, 'Comment')