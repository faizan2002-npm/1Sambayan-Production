const mongoose = require("mongoose");

//----- Channel SCHEMA -----//
const PositionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    members: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
          },
          status: {
            type: String,
            default: "Applied",
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

module.exports = mongoose.model("Position", PositionSchema);
