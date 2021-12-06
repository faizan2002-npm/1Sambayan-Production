const express = require("express");
const router = express.Router();

// Controller Functions //
const {
    create, //Create Poll via Admin
    update, //Update Poll via Admin
    deletePosition, //Delete Poll via Admin
    getPosition, //Get Single Poll
    getPositions, // Get All Polls 
    applyPosition,  // Vote a Poll 
} = require("../../methods/Position/cud");
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

router.post("/delete-position",
    [protect, authorize("admin")],
    deletePosition
);

router.get("/", protect, getPosition);
router.get("/position-list", protect, getPositions);
router.post("/apply-position", protect, applyPosition);

module.exports = router;
