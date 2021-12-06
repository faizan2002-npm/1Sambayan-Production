const mongoose = require("mongoose");

//----- Channel SCHEMA -----//
const PollSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  choices: [
    {
      votes: {
        type: Number,
        required: false,
        default: 0,
      },
      choice: {
        type: String,
        required: true,
      },
    },
  ],
  totalVotes: {
    type: Number,
    required: false,
    default: 0,
  },

  volunteer: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      isVoted: {
        type: Boolean,
        default: false,
      },
    },
  ],

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Poll", PollSchema);
