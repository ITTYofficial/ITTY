const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = new Schema({
  sendUser: {
    type: String,
    required: true,

  },
  getUser: {
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
  }
});

module.exports = mongoose.model("Message", messageSchema,"Message");