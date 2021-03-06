const asyncHandler = require("../../middlewares/async");
const sendEmail = require("../../services/sendEmail");
const Channel = require("../../models/Channel/Channel");
const User = require("../../models/User/User");

const methods = {
  //----- Create Community -----//
  create: asyncHandler(async (req, res, next) => {
    try {
      const { title, status } = req.body;
      let icon;

      if (req.file) {
        icon = req.file.key;
      }
      const ownerId = req.user._id;

      // Saving Channel in DataBase
      const channel = await Channel.create({
        title,
        status,
        icon,
        owner: ownerId,
      });

      return res.status(200).json({ channel });
    } catch (err) {
      next(err);
    }
  }),

  //----- Update Community -----//
  update: asyncHandler(async (req, res, next) => {
    try {
      const { title, channelId, status } = req.body;
      let icon;

      if (req.file) {
        icon = req.file.key;
      }
      let channel = await Channel.findById(channelId);

      if (title) {
        channel.title = title;
      }
      if (status) {
        channel.status = status;
      }
      if (icon) {
        channel.icon = icon;
      }

      const updatedChannel = await channel.save();

      return res
        .status(200)
        .json({ message: "Success!", Community: updatedChannel });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get channel -----//
  getChannel: asyncHandler(async (req, res, next) => {
    try {
      const channelId = req.params.channelId;
      const channel = await Channel.findById(channelId);
      return res.status(200).json({ channel });
    } catch (err) {
      next(err);
    }
  }),

  //----- Delete channel -----//
  deleteChannel: asyncHandler(async (req, res, next) => {
    try {
      const channelId = req.body.channelId;
      if (!channelId)
        return res.status(400).json({ message: "Provide Channel id" });
      await Channel.findByIdAndDelete(channelId);
      return res.status(200).json({ message: "Successfully Deleted!" });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get list of Channels -----//
  getChannels: asyncHandler(async (req, res, next) => {
    try {
      const channels = await Channel.find({});
      return res.status(200).json({ channels });
    } catch (err) {
      next(err);
    }
  }),

  //----- Join Channel -----//
  joinChannel: asyncHandler(async (req, res, next) => {
    try {
      const channelId = req.query.channelId;
      const requesterId = req.query.senderId;
      const userName = req.user.firstName;
      const member = { userId: requesterId, status: "Pending" };
      let channel = await Channel.findById(channelId);
      const channelName = channel.title;
      //---- Check if user is already a member ----//
      const isMember = await Channel.findOne({
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
      // console.log("channel",channel)

      return res.status(200).json({ channel });
    } catch (err) {
      next(err);
    }
  }),

  //----- List of users who requested to join channel -----//
  pendingUsers: asyncHandler(async (req, res, next) => {
    try {
      const channelId = req.query.channelId;
      let channel = await Channel.findById(channelId);
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
  }),

  //----- Take action against user request -----//
  takeActionForPendingRequest: asyncHandler(async (req, res, next) => {
    try {
      const channelId = req.body.channelId;
      const memberId = req.body.memberId;
      const status = req.body.status; // Approved OR Declined
      const memberDoc = await User.findById(memberId);
      let channel = await Channel.findById(channelId);
      let updateStatus = await Channel.updateOne(
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
  }),
  //----- List of all user channels OLD VERSION-----//
  getUserChannels: asyncHandler(async (req, res, next) => {
    try {
      const userId = req.user._id.toString();
      const channels = await Channel.find({
        members: { $elemMatch: { userId: userId } },
      }).select("_id members.$ title");
      return res.status(200).json({ channels });
    } catch (err) {
      next(err);
    }
  }),
  //----- List of all user channels NEW VERSION-----//
  // getUserChannels: asyncHandler(async (req, res, next) => {
  //   try {
  //     const userId = req.user._id.toString();
  //     let channels;
  //     let userChannels = [];
  //     channels = await Channel.find({});
  //     await Promise.all(
  //       channels.map((channel) => {
  //         channel.members.map((member) => {
  //           if (member.userId == userId) {
  //             channel.members = [member];
  //             userChannels.push(channel);
  //           }
  //         });
  //       })
  //     );
  //     return res.status(200).json({ userChannels });
  //   } catch (err) {
  //     next(err);
  //   }
  // }),
  

  //----- List of channels against UserId -----//
  allChannelsList: asyncHandler(async (req, res, next) => {
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
  }),
};

module.exports = methods;
