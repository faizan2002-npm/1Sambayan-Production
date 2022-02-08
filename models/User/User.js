const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// USERS SCHEMA
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },
  middleName: {
    type: String,
    required: false,
  },
  lastName: {
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
  phone: {
    type: Number,
    required: false,
  },

  age: {
    type: Number,
    required: false,
  },

  profileImage: {
    type: String,
  },

  fbLink: {
    type: String,
  },
  profession: {
    type: String,
  },

  notificationPreferences: {
    expoPushTokens: [String],
    fcmPushTokens: [String],
    pushDisabled: Boolean,
    lastPushSentDate: Date,
  },

  partyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "parties",
  },
  address: { type: String, required: false },
  country: { type: String, required: false },
  city: { type: String, required: false },
  province: { type: String, required: false },
  region: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  status: {
    type: String,
    enum: ["active", "deactive"],
    default: "deactive",
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },

  isApprover: {
    type: Boolean,
    default: false,
  },
  
  isManager: {
    type: Boolean,
    default: false,
  },

  barangay: {
    type: String,
    required: false,
  },

  profession: {
    type: String,
    required: false,
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
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//----- Generate and hash password token ----//
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(10).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.restPasswordExpires = Date.now() + 10 * 60 * 1000;
  return this.resetPasswordToken;
};

//Check user entered password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("User", UserSchema);
