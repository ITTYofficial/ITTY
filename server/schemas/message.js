const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = new Schema({
  sendUserId: {
    type: String,
    required: true,

  },
  getUserId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Number,
    default : 0
  }
});

module.exports = mongoose.model("Message", messageSchema,"Message");