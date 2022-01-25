const express = require("express");
const _ = require("lodash");
const uuid = require("uuid");
const ChatRoom = require("../../../models/Chat/ChatRoom");
const { protect, authorize } = require("../../../middlewares/auth");
const User = require("../../../models/User/User");
const sendEmail = require("../../../services/sendEmail");

const {
  createGroupChatSchema,
  removeMemberSchema,
} = require("../../../validators/chat/room");
const upload = require("../../../services/multer");

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

router.post(
  "/create_group_chat",
  [protect, upload.single("image")],
  async (req, res) => {
    console.log("req.body", req.body);
    const {
      name = "",
      description = "",
      members = [],
      isPublic,
    } = _.pick(req.body, ["name", "description", "members", "isPublic"]);
    let image;
    // console.log("req.file", req.file);
    if (req.file) {
      image = req.file.key;
    }
    const user = req.user;
    const chatRoomBuilder = {
      name,
      description,
      members: [
        { memberId: user._id.toHexString(), role: "admin" },
        ...JSON.parse(members).map((mem) => {
          return { memberId: mem, role: "member" };
        }),
      ],
      isPublic,
      roomType: "group",
      createdBy: user._id,
      image: image ? image : "",
    };

    const room = await new ChatRoom(chatRoomBuilder).save();

    const populatedRoom = await ChatRoom.findById(room._id).populate(
      "members.memberId",
      USER_PUBLIC_FIELDS
    );
    res.status(200).send(populatedRoom);
  }
);

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
  "/remove_member_from_group/:chatRoom/:memberId",
  protect,
  async (req, res) => {
    try {
      console.log("req.params", req.params);
      let message;
      const { chatRoom, memberId } = _.pick(req.params, [
        "memberId",
        "chatRoom",
      ]);
      // console.log('req.params chatRoom', chatRoom)
      // console.log('req.params memberId', memberId)
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
            members: { _id: memberId },
          },
        },
        { new: true }
      );

      console.log("updatedRoom", updatedRoom);
      if (updatedRoom) {
        message = "Chatroom deleted successfully";
      }
      // console.log(message)
      res.status(200).json({ message: message });
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
    const alreadyMember = await ChatRoom.findOne({
      _id: chatRoom,
      roomType: "group",
      "members.memberId": { $in: memberId },
      "member.role": "member",
    });

    if (alreadyMember)
      return res.status(400).send({
        error: {
          message: "Already a member in group.",
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

/*
These APIS is for the channel chat of asite admin with the audience
*/
// Get Single Channel
router.get("/get-channel", async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
});
// Get All Channel List
router.get("/get-channel-list", async (req, res, next) => {
  try {
    const channels = await ChatRoom.find({});
    return res.status(200).json({ channels });
  } catch (err) {
    next(err);
  }
});
//Create Channel
router.post(
  "/create-channel",
  [protect, authorize("admin"), upload.single("image")],
  async (req, res, next) => {
    try {
      const {
        name = "",
        description = "",
        status,
      } = _.pick(req.body, ["name", "description", "status"]);
      let image;
      if (req.file) {
        image = req.file.key;
      }
      const user = req.user;
      const chatRoomBuilder = {
        name,
        description,
        members: [{ memberId: user._id.toHexString(), role: "admin" }],
        roomType: "group",
        createdBy: user._id,
        image,
      };

      const room = await new ChatRoom(chatRoomBuilder).save();

      res.status(200).json({ room });
    } catch (err) {
      next(err);
    }
  }
);
//Update Channel
router.put(
  "/update-channel",
  [protect, authorize("admin"), upload.single("image")],
  async (req, res, next) => {
    try {
      const { title, roomId, status } = _.pick(req.body, [
        "name",
        "roomId",
        "status",
      ]);
      let image;

      if (req.file) {
        image = req.file.key;
      }
      let room = await ChatRoom.findById(roomId);

      if (title) {
        room.title = title;
      }
      if (status) {
        room.status = status;
      }
      if (image) {
        room.image = image;
      }

      const updatedRoom = await room.save();

      return res.status(200).json({ message: "Success!", room: updatedRoom });
    } catch (err) {
      next(err);
    }
  }
);
//Delete Channel
router.post(
  "/delete-channel",
  [protect, authorize("admin")],
  async (req, res, next) => {
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
    } catch (err) {
      next(err);
    }
  }
);
//Join the Channel Request
router.post("/join-channel", protect, async (req, res, next) => {
  try {
    const channelId = req.query.channelId;
    const requesterId = req.query.senderId;
    const userName = req.user.firstName;
    const member = { userId: requesterId, status: "Pending" };
    let channel = await ChatRoom.findById(channelId);
    const channelName = channel.name;
    //---- Check if user is already a member ----//
    const isMember = await ChatRoom.findOne({
      _id: channelId,
      members: { $elemMatch: { userId: requesterId } },
    });
    if (isMember) {
      return res
        .status(400)
        .json({ message: "You have already requested to join this channel" });
    }
    channel.members.push(member);
    await channel.save();

    //-- Send Email to Admin --//
    const message = `${userName} has requested to join ${channelName}, Please review his request and take action accordingly.`;
    await sendEmail({
      email: process.env.SMTP_EMAIL,
      subject: "Channel Request",
      message: message,
    });

    return res.status(200).json({ channel });
  } catch (err) {
    next(err);
  }
});
// Get all Pending users against the Channel Id
router.post("/pending-users", protect, async (req, res, next) => {
  try {
    const channelId = req.query.channelId;
    let channel = await ChatRoom.findById(channelId);
    let members = channel.members;
    let pendingUsers = [];
    members.map((user) => {
      if (user.status == "Pending" || user.status == "Declined") {
        pendingUsers.push(user);
      }
    });

    let enrichPendingUsers = [];
    await Promise.all(
      pendingUsers.map(async (user) => {
        let enrichedUser = await User.findById(user.userId);
        if (enrichedUser) {
          enrichedUser.status = user.status;
          enrichPendingUsers.push(enrichedUser);
        }
      })
    );
    return res.status(200).json({ enrichPendingUsers });
  } catch (err) {
    next(err);
  }
});
// Get all Channels against the User id
router.get("/get-user-channel", protect, async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const channels = await ChatRoom.find({
      members: { $elemMatch: { userId: userId } },
    }).select("_id members.$ title");
    return res.status(200).json({ channels });
  } catch (err) {
    next(err);
  }
});
// Get all Channels data against the User id
router.get("/get-all-channels", protect, async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    let channels;
    let userChannels = [];
    let nonUserChannels = [];
    channels = await Channel.find({});

    await Promise.all(
      channels.map((channel) => {
        if (channel.members) {
          channel.members.map((member) => {
            console.log(member);
            if (member.userId == userId) {
              channel.members = [member];
              userChannels.push(channel);
            } else {
              console.log("else");

              nonUserChannels.push(channel);
            }
          });
        } else {
          nonUserChannels.push(channel);
        }
      })
    );
    return res.status(200).json({ userChannels, nonUserChannels });
  } catch (err) {
    next(err);
  }
});
// Approve OR Decline channel join request //
router.post("/request-action", protect, async (req, res, next) => {
  try {
    const channelId = req.body.channelId;
    const memberId = req.body.memberId;
    const status = req.body.status; // Approved OR Declined
    const memberDoc = await User.findById(memberId);
    let channel = await ChatRoom.findById(channelId);
    let updateStatus = await ChatRoom.updateOne(
      {
        _id: channelId,
        members: { $elemMatch: { userId: memberId } },
      },
      {
        $set: { "members.$.status": status },
      }
    );
    //-- Send Email to User --//
    const message = `Admin has responded to join your request to ${channel.title}, Please review your updated request status.`;
    await sendEmail({
      email: memberDoc.email,
      subject: "Channel Request",
      message: message,
    });
    return res.status(200).json({ updateStatus });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
