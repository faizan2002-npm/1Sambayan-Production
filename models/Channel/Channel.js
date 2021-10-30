const mongoose = require("mongoose");

//----- Channel SCHEMA -----//
const ChannelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  members: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      status: {
        type: String,
        enum: ["Pending", "Approved", "Declined"],
      },
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
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

module.exports = mongoose.model("Channel", ChannelSchema);
