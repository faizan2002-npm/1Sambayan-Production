const express = require("express");
const router = express.Router();

// Controller Functions //
const {
  create,
  update,
  getChannel,
  getChannels,
  deleteChannel,
  joinChannel,
  pendingUsers,
  takeActionForPendingRequest,
} = require("../../methods/Channel/cud");
const { protect, authorize } = require("../../middlewares/auth");
const upload = require("../../services/multer");

//----- Community -----//
router.get("/", getChannel);
router.get("/channel-list", getChannels);
router.post(
  "/create",
  [protect, authorize("admin"), upload.single("icon")],
  create
);
router.put(
  "/update",
  [protect, authorize("admin"), upload.single("icon")],
  update
);
router.post("/delete-channel", deleteChannel);

router.post("/join-channel", protect, joinChannel);
router.post("/pending-users", protect, pendingUsers);

// Approve OR Decline request //
router.post("/request-action", protect, takeActionForPendingRequest);

module.exports = router;
