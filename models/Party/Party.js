const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
//----- Event SCHEMA -----//
const PartySchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
    select: false,
  },
  role: {
    type: String,
    default: "party",
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  restPasswordExpires: Date,

  verifyEmailToken: String,
  emailVerificationExpiresIn: Date,
});

//sign JWT and return
PartySchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//----- Generate and hash password token ----//
PartySchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(10).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.restPasswordExpires = Date.now() + 10 * 60 * 1000;
  return this.resetPasswordToken;
};

//Check user entered password
PartySchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("Party", PartySchema);
