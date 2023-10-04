const mongoose = require('mongoose');
const { Schema } = mongoose;

const studySchema = new Schema({

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
    // postNum: {
    //     // 글넘버
    //     type: Number
    // },
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
    // postCategory: {
    //     // 글카테고리
    //     type: String,
    //     // required : true
    // },
    selectedValues: {
        type: String
    },
    persons: {
        // 모집인원
        type: Number
    },
    recruit: {
        // 모집상태
        // 1 = 모집중, -1 = 모집완료
        type: Number,
        default: 1
    },
    periodStart: {
        // 모집기간 시작
        // 기본값으로 현재 날짜 == 글 작성 시간
        type: Date
    },
    periodEnd: {
        // 모집기간 끝
        type: Date
    }
})

module.exports = mongoose.model('Study', studySchema, 'Study')