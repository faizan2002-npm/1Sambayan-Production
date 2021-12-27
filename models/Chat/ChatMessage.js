const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  chatRoom: {
    type: Schema.Types.ObjectId,
    ref: "chatroom",
    required: true,
    index: true,
  },

  messageType: {
    type: String,
    default: "message",
    enum: ["message", "info", "file"],
  },

  message: { type: String, default: "", trim: true },
  filename: {
    type: String,
  },
  tags: [
    {
      startIndex: Number,
      endIndex: Number,
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],

  delivered: {
    type: Boolean,
    default: false,
  },

  seen: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  isMessageModified: {
    type: Boolean,
    default: false,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },

  customIdentifier: {
    type: String,
    trim: true,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ChatMessage = mongoose.model("chatmessage", chatMessageSchema);
module.exports = ChatMessage;
