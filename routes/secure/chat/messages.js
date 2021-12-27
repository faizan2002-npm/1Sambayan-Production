const express = require("express");
const _ = require("lodash");
const { protect } = require("../../../middlewares/auth");
const ChatMessage = require("../../../models/Chat/ChatMessage");
const ChatRoom = require("../../../models/Chat/ChatRoom");

const USER_PUBLIC_FIELDS =
  "firstname lastname image.thumbnailUrl image.imageUrl image.aspectRatio";

const router = express.Router();

router.get("/list/:chatRoom", protect, async (req, res) => {
  try {
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
    const { user } = req;
    const room = await ChatRoom.find({
      _id: chatRoom.toString(),
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
      .populate("sender");

    res.send(messages);
  } catch (error) {
    console.log("ERROR CHAT", error);
  }
});

router.post("/delete-message/:messageId", protect, async (req, res) => {
  try {
    let { messageId } = req.params;
    if (!messageId) throw new Error("Missing Message Id");
    const deleteMessage = await ChatMessage.findByIdAndUpdate(
      messageId,
      {
        isDeleted: true,
      },
      { new: true }
    );
    res.status(200).json({ message: "message has been deleted successfully!" });
  } catch (error) {
    console.log("ERROR CHAT", error);
    res.status(400).json({ message: error });
  }
});

module.exports = router;
