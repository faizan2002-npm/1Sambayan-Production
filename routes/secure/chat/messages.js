const express = require("express");
const _ = require("lodash");
const ChatMessage = require("../../../models/Chat/ChatMessage");
const ChatRoom = require("../../../models/Chat/ChatRoom");

const USER_PUBLIC_FIELDS =
  "firstname lastname image.thumbnailUrl image.imageUrl image.aspectRatio";

const router = express.Router();

router.get("/list/:chatRoom", async (req, res) => {
  let { last_message_id = "", pageSize = 10 } = req.query;
  pageSize = parseInt(pageSize);
  const { chatRoom } = req.params;

  const query = {
    chatRoom,
  };

  if (last_message_id) {
    query._id = {
      $lt: last_message_id,
    };
  }
  const { user } = req.authSession;
  const room = await ChatRoom.find({
    _id: chatRoom,
    "members.memberId": { $in: [user._id] },
  });
  if (!room)
    return res.status(400).send({
      error: {
        message: "Invalid chat room id",
      },
    });

  const messages = await ChatMessage.find(query)
    .limit(pageSize)
    .sort("-createdAt")
    .populate("sender", USER_PUBLIC_FIELDS);

  res.send(messages);
});

module.exports = router;
