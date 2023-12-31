const mongoose = require("mongoose");
// board스키마 정의(컬렉션 구조) DTO와 비슷함
const { Schema } = mongoose;

// 무슨 의미인지 모름, 일단 주석 처리
// const {
//   Types: { ObjectId }
// } = Schema;

const boardSchema = new Schema({
  writer: {
    type: String,
    // required: true,
    // ref: "User"
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imgPath: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Board", boardSchema);