const asyncHandler = require("../../middlewares/async");
const Poll = require("../../models/Poll/Poll");
const User = require("../../models/User/User");

const methods = {
  //----- Create Community -----//
  create: asyncHandler(async (req, res, next) => {
    try {
      const { name, question, choices } = req.body;

      const ownerId = req.user._id;
      // Saving Channel in DataBase
      const poll = await Poll.create({
        name,
        question,
        choices,
        owner: ownerId,
      });

      return res.status(200).json({ poll });
    } catch (err) {
      next(err);
    }
  }),

  //----- Update Community -----//
  update: asyncHandler(async (req, res, next) => {
    try {
      const { name, question, choices, pollId } = req.body;
      console.log("req.body", req.body);
      let poll = await Poll.findById(pollId);
      console.log("poll", poll);
      if (name) {
        poll.name = name;
      }
      if (question) {
        poll.question = question;
      }
      if (choices) {
        poll.choices = choices;
      }

      const updatedPoll = await poll.save();

      return res.status(200).json({ message: "Success!", Poll: updatedPoll });
    } catch (err) {
      next(err);
    }
  }),

  //----- Delete channel -----//
  deletePoll: asyncHandler(async (req, res, next) => {
    try {
      const pollId = req.body.pollId;
      if (!pollId) return res.status(400).json({ message: "Provide Poll id" });
      await Poll.findByIdAndDelete(pollId);
      return res.status(200).json({ message: "Successfully Deleted!" });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get channel -----//
  getPoll: asyncHandler(async (req, res, next) => {
    try {
      const pollId = req.query.pollId;
      const poll = await Poll.findById(pollId);
      return res.status(200).json({ poll });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get list of Channels -----//
  getPolls: asyncHandler(async (req, res, next) => {
    try {
      const polls = await Poll.find({});
      return res.status(200).json({ polls });
    } catch (err) {
      next(err);
    }
  }),

  //----- Join Channel -----//
  votePoll: asyncHandler(async (req, res, next) => {
    try {
      const pollId = req.query.pollId;
      const userId = req.query.userId;
      const choiceId = req.query.choiceId;
      let initialPoll = await Poll.findById({
        _id: pollId,
        volunteer: { $elemMatch: { userId: userId } },
      });
      if (initialPoll.volunteer.length > 0) {
        if (initialPoll.volunteer[0].userId == userId) {
          return res
            .status(400)
            .json({ message: "You have already submitted your response" });
        }
      }
      let poll = await Poll.updateOne(
        {
          _id: pollId,
          choices: { $elemMatch: { _id: choiceId } },
        },

        {
          $inc: {
            "choices.$.votes": 1,
            totalVotes: 1,
          },
          $push: {
            volunteer: {
              userId: userId,
              isVoted: true,
            },
          },
        }
      );

      return res.status(200).json({ poll });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }),
};

module.exports = methods;
