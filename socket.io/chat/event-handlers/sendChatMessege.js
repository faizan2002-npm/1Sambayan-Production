const _ = require("lodash");
const ChatRoom = require("../../../models/Chat/ChatRoom");
const ChatMessage = require("../../../models/Chat/ChatMessage");
const User = require("../../../models/User/User");

const USER_PUBLIC_FIELDS =
  "firstname lastname image.thumbnailUrl image.imageUrl image.aspectRatio";

module.exports = (socket) => {
  socket.on("send_chat_message", async (message, acknowledge) => {
    try {
      //validation
      const { user } = socket;

      const chatMessage = await new ChatMessage({
        ...message,
        sender: user._id,
        seen: [user._id],
      }).save();
      const senderDoc = await User.findById(user._id);
      const chatRoom = await ChatRoom.findByIdAndUpdate(message.chatRoom, {
        lastMessage: chatMessage._id,
        lastActive: Date.now(),
      });

      const populatedChatMessage = {
        sender: senderDoc,
        ..._.pick(chatMessage, [
          "chatRoom",
          "messageType",
          "message",
          "tags",
          "delivered",
          "seen",
          "customIdentifier",
          "isDeleted",
          "createdAt",
        ]),
      };
      //acknowledge the sender
      acknowledge({
        type: "success",
        data: populatedChatMessage,
      });

      //send notification to the other sockets
      chatRoom.members.forEach(async (member) => {
        socket
          .to(member.memberId.toHexString())
          .emit("chat_message_recieved", populatedChatMessage);
      });

      //send push notification to offline users

      const offlineUsers = [];
      const offlineUsersMap = {};
      let onlineUsers = [];
      const onlineUsersMap = {};

      for (let i = 0; i < chatRoom.members.length; i++) {
        const memberId = chatRoom.members[i].memberId.toHexString();
        const clients = await socket.adapter.sockets(new Set([memberId]));
        if (clients.size === 0) {
          offlineUsers.push(memberId);
          offlineUsersMap[memberId] = 1;
        } else {
          onlineUsers.push(memberId);
          onlineUsersMap[memberId] = 1;
        }
      }
      if (offlineUsers.length === 0 && onlineUsers.length === 0) return;

      //update the room chat count for users
      if (offlineUsers.length > 0) {
        chatRoom.members = chatRoom.members.map((mem) => {
          if (offlineUsersMap[mem.memberId.toHexString()] === 1) {
            //user id offline
            mem.chatCount = mem.chatCount + 1;
          }
          return mem;
        });
        await chatRoom.save();
      }

      if (onlineUsers.length > 0) {
        chatRoom.members = chatRoom.members.map((mem) => {
          if (onlineUsersMap[mem.memberId.toHexString()] === 1) {
            //user id offline
            mem.chatCount = mem.chatCount + 1;
          }
          return mem;
        });
        await chatRoom.save();
      }
    } catch (error) {
      console.log("error", error);
      return error;
    }
  });
};
