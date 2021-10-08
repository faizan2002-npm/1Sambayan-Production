const express = require("express");
const router = express.Router();

// Controller Functions //
const {
    create,
    update,
    getConvenors,
    getConvenor,
    deleteConvenor,
} = require("../../methods/convenor/cud");
const { protect, authorize } = require("../../middlewares/auth");
const upload = require("../../services/multer");
const convenorUploads = upload.fields([
    {
        name: "image",
        maxCount: 1,
    }
]);

//----- convenor -----//
router.get("/", getConvenor);
router.get("/convenor-list", getConvenors);
router.post("/create", [protect, authorize("admin"), convenorUploads], create);
router.put("/update", [protect, authorize("admin"), convenorUploads], update);
router.post("/delete-convenor", deleteConvenor);

module.exports = router;
