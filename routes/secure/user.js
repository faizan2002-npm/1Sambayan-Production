const express = require("express");
const router = express.Router();

// Controller Functions //
const accountMethods = require("../../methods/User/account");
const {
  editProfile,
  getProfile,
  deleteUser,
  getProfileByID
} = require("../../methods/User/profile");
const { protect, authorize } = require("../../middlewares/auth");
const upload = require("../../services/multer");
//----- Edit Profile -----//
router.put("/edit-profile", [protect, upload.single("image")], editProfile);

//----- Get Profile -----//
router.get("/profile", protect, getProfile);
router.get("/profile-by-ID", protect, getProfileByID);

//----- Get All users -----//
router.get(
  "/get-all-users",
  [protect],
  accountMethods.getAllUsers
);
router.get(
  "/get-all-users-by-party",
  [protect],
  accountMethods.getAllUsersByParty
);

//----- Delete User -----//
router.post(
  "/delete-user",
  [protect],
  accountMethods.deleteUser
);

module.exports = router;
