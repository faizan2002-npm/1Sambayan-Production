const express = require("express");
const router = express.Router();

// Controller Functions //
const { upload, getObject } = require("../../methods/AWS/gud");

router.post("/uploadImage", upload);

router.post("/get-object", getObject);

module.exports = router;
