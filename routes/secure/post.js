const express = require("express");
const router = express.Router();

// Controller Functions //
const {
  create,
  update,
  getPosts,
  getPost,
  search,
  deletePost,
  getSinglePost,
  getAllPosts,
  listByParty,
  approvedByParty,
  unapprovedByParty,
  todayPost,
} = require("../../methods/Post/cud");
const { protect, authorize } = require("../../middlewares/auth");
const upload = require("../../services/multer");
const postUploads = upload.fields([
  {
    name: "image",
    maxCount: 1,
  },
  {
    name: "video",
    maxCount: 1,
  },
]);

//----- POST -----//
router.get("/list-by-party/:partyId", listByParty);
router.get("/approved-by-party/:partyId", approvedByParty);
router.get("/unapproved-by-party/:partyId", unapprovedByParty);
router.get("/today-post/:partyId", todayPost);
router.get("/", getPost);
router.get("/single", getSinglePost);
router.get("/post-list", getPosts);
router.get("/list", getAllPosts);
router.post("/create", [protect, postUploads], create);
router.put("/update", [protect, postUploads], update);
router.post("/search", search);
router.post("/delete-post", deletePost);

module.exports = router;
