const express = require("express");
const router = express.Router();

// Controller Functions //
const {
  registerUser,
  login,
  mailForResetPassword,
  resetPassword,
  verifyPhone,
  contactUs,
} = require("../../methods/User/account");
const { forgotPassword } = require("../../methods/User/profile");

//----- USER Registration -----//
router.post("/register", registerUser);

router.post("/login", login);

router.post("/contact-us", contactUs);

router.post("/verify-phone", verifyPhone);

router.post("/update-password", forgotPassword);

router.post("/send-mail", mailForResetPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
