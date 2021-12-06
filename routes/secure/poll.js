const express = require("express");
const router = express.Router();

// Controller Functions //
const {
    create, //Create Poll via Admin
    update, //Update Poll via Admin
    deletePoll, //Delete Poll via Admin
    getPoll, //Get Single Poll
    getPolls, // Get All Polls 
    votePoll,  // Vote a Poll 
} = require("../../methods/Poll/cud");
const { protect, authorize } = require("../../middlewares/auth");

//----- Community -----//
router.post(
    "/create",
    [protect, authorize("admin")],
    create
);

router.put(
    "/update",
    [protect, authorize("admin")],
    update
);

router.post("/delete-poll",
    [protect, authorize("admin")],
    deletePoll
);

router.get("/", protect, getPoll);
router.get("/poll-list", protect, getPolls);
router.post("/vote-poll", protect, votePoll);

module.exports = router;
