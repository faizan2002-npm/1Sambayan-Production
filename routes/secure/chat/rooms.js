const express = require("express");
const _ = require("lodash");
const uuid = require("uuid");
const ChatRoom = require("../../../models/Chat/ChatRoom");
const { protect, authorize } = require("../../../middlewares/auth");

const {
  createGroupChatSchema,
  removeMemberSchema,
} = require("../../../validators/chat/room");

const socketIO = require("../../../services/socketIO");
const ChatMessage = require("../../../models/Chat/ChatMessage");
const validateObjectbyId = require("../../../validators/chat/validateObjectbyId");

const router = express.Router();

const USER_PUBLIC_FIELDS =
  "firstName lastName middleName email phone profileImage";

router.get("/my_chat_rooms", protect, async (req, res) => {
  const user = req.user;

  const query = {
    members: {
      $elemMatch: {
        memberId: user._id.toString(),
        role: { $ne: "join_requester" },
      },
    },
  };
  const orClause = [
    {
      roomType: "direct",
      lastMessage: { $ne: null },
    },
    {
      roomType: "group",
    },
  ];

  let rooms = await ChatRoom.find(query)
    .populate("members.memberId", USER_PUBLIC_FIELDS)
    .populate("lastMessage");

  const userId = user._id.toHexString();
  rooms = rooms.map((room) => {
    room = _.pick(room, [
      "_id",
      "members",
      "membersCanAdd",
      "isPublic",
      "lastMessage",
      "name",
      "image",
      "description",
      "roomType",
      "createdBy",
      "lastActive",
      "createdAt",
    ]);
    for (let i = 0; i < room.members.length; ++i) {
      if (room.members[i].memberId._id.toHexString() === userId) {
        room.chatCount = room.members[i].chatCount;
        break;
      }
    }
    return room;
  });

  res.send(rooms);
});

router.get("/get_room/:id", async (req, res) => {
  const { id } = req.params;
  if (!validateObjectbyId(id))
    return res.status(400).send({
      error: {
        message: "Invalid Room Id",
      },
    });

  const room = await ChatRoom.findById(id).populate(
    "members.memberId",
    USER_PUBLIC_FIELDS
  );

  if (!room)
    return res.status(404).send({
      error: {
        message: "Room Not Found.",
      },
    });

  res.send(room);
});

router.get("/get_private_chat_room/:memberId", protect, async (req, res) => {
  try {
    const { memberId } = req.params;
    const user = req.user;
    if (!validateObjectbyId(memberId))
      return res.status(400).send({
        error: {
          message: "Invalid member Id",
        },
      });
    // console.log("memberId", memberId);
    const data = {
      roomType: "direct",
      createdBy: user._id,
      members: [
        { memberId: user._id.toHexString(), role: "member" },
        { memberId, role: "member" },
      ],
    };

    let room = await ChatRoom.findOne({
      roomType: "direct",
      "members.memberId": { $all: [memberId, user._id] },
    }).populate("members.memberId", USER_PUBLIC_FIELDS);

    console.log("ROOM", room);

    if (!room) {
      await new ChatRoom(data).save();
      room = await ChatRoom.findOne({
        roomType: "direct",
        "members.memberId": { $all: [memberId, user._id] },
      }).populate("members.memberId", USER_PUBLIC_FIELDS);

      console.log("ROOM 1", room);
    }

    res.send(room);
  } catch (err) {
    console.log("error", err);
  }
});

router.post("/create_group_chat", protect, async (req, res) => {
  const {
    name = "",
    description = "",
    members = [],
    image,
    isPublic,
  } = _.pick(req.body, ["name", "description", "members", "image", "isPublic"]);

  const user = req.user;
  const chatRoomBuilder = {
    name,
    description,
    members: [
      { memberId: user._id.toHexString(), role: "admin" },
      ...members.map((mem) => {
        return { memberId: mem, role: "member" };
      }),
    ],
    isPublic,
    roomType: "group",
    createdBy: user._id,
  };

  if (image) {
    const imageMedia = await ImageMedia.findOneAndUpdate(
      { _id: image },
      { isUsed: true },
      { new: true }
    );

    if (!imageMedia)
      return res.status(400).send({
        error: {
          message: "Invalid image id.",
        },
      });

    chatRoomBuilder.image = imageMedia;
  }

  const room = await new ChatRoom(chatRoomBuilder).save();

  const populatedRoom = await ChatRoom.findById(room._id).populate(
    "members.memberId",
    USER_PUBLIC_FIELDS
  );
  res.send(populatedRoom);
});

router.put("/reset_my_chat_count/:id", protect, async (req, res) => {
  const { id } = req.params;
  if (!validateObjectbyId(id))
    return res.status(400).send({
      error: {
        message: "Invalid group Id",
      },
    });

  const user = req.user;

  const chatRoom = await ChatRoom.findById(id);

  if (!chatRoom)
    return res.status(400).send({
      error: {
        message: "Invalid group Id",
      },
    });

  chatRoom.members.map((mem) => {
    if (mem.memberId.toHexString() === user._id.toHexString()) {
      mem.chatCount = 0;
    }
    return mem;
  });

  await chatRoom.save();
  res.send({ message: "Room Chat count updated", count: 0 });
});
router.delete(
  "/remove_member_from_group/:chatRoom",
  protect,
  async (req, res) => {
    try {
      const { chatRoom } = req.params;
      const { memberId } = _.pick(req.body, ["memberId"]);
      if (!validateObjectbyId(chatRoom))
        return res.status(400).send({
          error: {
            message: "Invalid group Id",
          },
        });

      const user = req.user;

      const room = await ChatRoom.findOne({
        _id: chatRoom,
        roomType: "group",
        "members.memberId": { $in: user._id },
        "member.role": "admin",
      });
      if (!room)
        return res.status(400).send({
          error: {
            message: "Invalid group Id",
          },
        });

      const updatedRoom = await ChatRoom.findByIdAndUpdate(
        chatRoom,
        {
          $pull: {
            members: { memberId: memberId },
          },
        },
        { new: true }
      );
      res.status(200).send(updatedRoom);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

    // const io = socketIO.getIO();
    // if (io) {
    //   room.members.forEach((member) => {
    //     io.to(member.memberId.toHexString()).emit(
    //       "member_left_chat_group",
    //       responseObj
    //     );
    //   });
    // }
  }
);

router.delete("/delete-group/:chatRoom", protect, async (req, res) => {
  try {
    const { chatRoom } = req.params;
    if (!validateObjectbyId(chatRoom))
      return res.status(400).send({
        error: {
          message: "Invalid group Id",
        },
      });

    const user = req.user;

    const room = await ChatRoom.findOne({
      _id: chatRoom,
      roomType: "group",
      "members.memberId": { $in: user._id },
      "member.role": "admin",
    });

    if (!room)
      return res.status(400).send({
        error: {
          message: "Invalid group Id",
        },
      });

    const updatedRoom = await ChatRoom.findByIdAndDelete(chatRoom);

    res.status(200).json({ message: "Chatroom deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/add-member/:chatRoom", protect, async (req, res) => {
  try {
    const { chatRoom } = req.params;
    const { memberId } = _.pick(req.body, ["memberId"]);
    if (!validateObjectbyId(chatRoom))
      return res.status(400).send({
        error: {
          message: "Invalid group Id",
        },
      });

    const user = req.user;

    const room = await ChatRoom.findOne({
      _id: chatRoom,
      roomType: "group",
      "members.memberId": { $in: user._id },
      "member.role": "admin",
    });

    if (!room)
      return res.status(400).send({
        error: {
          message: "Invalid group Id",
        },
      });

    const updatedRoom = await ChatRoom.findByIdAndUpdate(
      chatRoom,
      {
        $push: {
          members: {
            memberId: memberId,
            role: "member",
            chatCount: 0,
          },
        },
      },
      { new: true }
    ).populate("members.memberId");

    res.send(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/leave_group/:chatRoom", protect, async (req, res) => {
  const { chatRoom } = req.params;

  if (!validateObjectbyId(chatRoom))
    return res.status(400).send({
      error: {
        message: "Invalid group Id",
      },
    });

  const user = req.user;
  const room = await ChatRoom.findOneAndUpdate(
    {
      _id: chatRoom,
      roomType: "group",
      "members.memberId": { $in: user._id },
    },
    {
      $pull: {
        members: { memberId: user._id },
      },
    },
    { new: true }
  );

  if (!room)
    return res.status(400).send({
      error: {
        message: "Invalid group Id",
      },
    });

  const leavingMessage = await new ChatMessage({
    sender: user._id,
    chatRoom,
    messageType: "info",
    customIdentifier: uuid.v4(),
    message: `${user.firstname} ${user.lastname} left the group`,
  }).save();

  const responseObj = {
    sender: _.pick(user, USER_PUBLIC_FIELDS.split(" ")),
    ..._.pick(leavingMessage, [
      "chatRoom",
      "messageType",
      "customIdentifier",
      "message",
      "createdAt",
      "seen",
      "delivered",
    ]),
  };

  const io = socketIO.getIO();
  if (io) {
    room.members.forEach((member) => {
      io.to(member.memberId.toHexString()).emit(
        "member_left_chat_group",
        responseObj
      );
    });
  }

  res.send(responseObj);
});
module.exports = router;
