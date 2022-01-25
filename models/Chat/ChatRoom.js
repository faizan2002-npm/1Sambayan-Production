const mongoose = require("mongoose");
const ChatMessage = require("./ChatMessage");
const { Schema } = mongoose;

const chatRoomSchema = new Schema({
  roomType: {
    type: String,
    enum: ["direct", "group"],
    required: true,
  },

  name: {
    type: String,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },

  image: {
    type: String,
  },
  membersCanAdd: {
    type: Boolean,
    default: false,
  },

  members: [
    new Schema({
      memberId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Approved", "Declined"],
      },
      role: {
        type: String,
        enum: ["admin", "member", "join_requester"],
      },
      chatCount: {
        type: Number,
        default: 0,
      },
    }),
  ],

  isPublic: {
    type: Boolean,
    default: true,
  },
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: "chatmessage",
    default: null,
  },

  lastActive: {
    type: Date,
    default: Date.now,
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "InActive"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ChatRoom = mongoose.model("chatroom", chatRoomSchema);

module.exports = ChatRoom;
