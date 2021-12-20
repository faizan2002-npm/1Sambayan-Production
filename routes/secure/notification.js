const express = require("express");
const router = express.Router();

// Controller Functions //
const ExpoPushNotificationService = require("../../services/push-notification");
const { protect, authorize } = require("../../middlewares/auth");

router.post("/send-pushNoti", protect, (req, res) => {
  const recipient = req.user;
  const notificationTitle = req.body.notificationTitle;
  const notificationBody = req.body.notificationBody;
  if (!(recipient && notificationTitle && notificationBody)) {
    return res.status(400).json({ message: "Incomplete Parameters" });
  }
  try {
    const sendNoti = ExpoPushNotificationService.send([
      {
        recipient,
        notificationTitle,
        notificationBody,
      },
    ]);
    return res.status(200).json("success!");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
