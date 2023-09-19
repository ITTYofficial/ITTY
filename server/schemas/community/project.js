const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({

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

    // 게시판마다 달라지는 부분
    // postCatogory: {
    //     // 글카테고리
    //     type: String,
    //     // required : true
    // },

    startDate: {
        // 프로젝트 시작일
        type: Date
    },
    endDate: {
        // 프로젝트 종료일
        type: Date
    },
    persons: {
        // 모집인원
        type: Number
    },
    recruit:{
        // 모집상태
        type: String
    },
    position: { 
        // 모집하는 포지션
        type: String
    },
    framework_front: {
        // 사용할 프레임워크
        type: String
    },
    framework_back: {
        // 사용할 프레임워크
        type: String
    },
    framework_db: {
        // 사용할 프레임워크
        type: String
    }
})

module.exports = mongoose.model('Project', projectSchema, 'Project')