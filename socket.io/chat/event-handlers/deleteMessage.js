const ChatMessage = require("../../../models/Chat/ChatMessage");

const { messageDeleteSchema } = require("../../../validators/chat/message");

module.exports = (socket) => {
    socket.on("delete_message", async (payload, acknowledge) => {
        //validation
        try {
            await messageDeleteSchema.validate(payload);
        } catch (validationError) {
            const { path, errors } = validationError;

            return acknowledge({
                type: "error",
                error: {
                    [path]: errors[0],
                },
            });
        }

        const { messageId } = payload;
        const { user } = socket;

        const chatMessage = await ChatMessage.findByIdAndUpdate(
            messageId,
            {
                isDeleted: true,
            },
            { populate: { path: "chatRoom" } }
        );

        if (!chatMessage)
            return acknowledge({
                type: "error",
                error: {
                    message: "Invalid chat message",
                },
            });

        acknowledge({
            type: "success",
            mesasge: "message deleted",
        });

        chatMessage.chatRoom.members.forEach(async (member) => {
            if (user._id.tohexString() !== chatMessage.sender.toHexString())
                socket
                    .to(member.memberId.toHexString())
                    .emit("chat_message_deleted", { messageId });
        });
    });
};
