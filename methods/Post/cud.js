
const express = require("express");
const fs = require("fs");
const nodemailer = require("nodemailer");
const asyncHandler = require("../../middlewares/async");
const Site = require("../../models/Site/Site");
const Post = require("../../models/Post/Post");
var path = require("path");
const entities = require("html-entities");
// const entities = new Entities();

const methods = {
  //----- Create post -----//
  create: asyncHandler(async (req, res, next) => {
    try {
      const { title, description } = req.body;
      let image, video;

      if (req.files.video) {
        video = req.files.video[0].filename;
      }
      if (req.files.image) {
        image = req.files.image[0].filename;
      }
      const ownerId = req.user._id;

      const newDescription = description.replace(/(<([^>]+)>)/gi, "");

      // Saving User in DataBase
      const post = await Post.create({
        title,
        description: newDescription,
        image,
        video,
        owner: ownerId,
      });

      res.status(200).json({ post: post });
    } catch (err) {
      next(err);
    }
  }),

  //----- Update post -----//
  update: asyncHandler(async (req, res, next) => {
    try {
      const { title, description, postId } = req.body;
      let image, video;

      if (req.files.video) {
        video = req.files.video[0].filename;
      }
      if (req.files.image) {
        image = req.files.image[0].filename;
      }
      let post = await Post.findById(postId);
      if (title) {
        post.title = title;
      }
      if (description) {
        const newDescription = description.replace(/(<([^>]+)>)/gi, "");
        post.description = newDescription;
      }
      if (image) {
        post.image = image;
      }
      if (video) {
        post.video = video;
      }

      const updatedPost = await post.save();

      res.status(200).json({ message: "Success!", Post: updatedPost });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get post -----//
  getPost: asyncHandler(async (req, res, next) => {
    try {
      const postId = req.query.postId;
      if (!postId) return res.status(400).json({ message: "Provide post id" });
      const post = await Post.findById(postId);
      // console.log("post.title", post.title);
      // if (process.env.NODE_ENV == "production") {
      const indexFilePath = path.join(__dirname, "../../client/build", "index.html");

      const data = {
        ogTitle: `${post.title}`,
        ogDiscription: `${post.description}`,
        image: '',
        _id: post._id,
        request: 'singlePost'
      };
      if (post.image) {
        data.image = post.image;
      }
      res.render('single', { data: data });
      // const content = fs.readFileSync(indexFilePath);

      // let resHtml = content.toString();

      // resHtml = resHtml.replace("_META_TITLE_", entities.encode(post.title));
      // resHtml = resHtml.replace(
      //   "_META_DESCRIPTION_",
      //   entities.encode(post.description)
      // );

      // resHtml = resHtml.replace("_META_THUMBNAIL_", `${process.env.UPLOAD_BASE_URL}${post.image}`);
      // resHtml = resHtml.replace("_META_TWITTER_THUMBNAIL_", `${process.env.UPLOAD_BASE_URL}${post.image}`);

      // // res.status(200).json({ post: post });
      // res.header("Content-Type", "text/html; charset=UTF-8").send(resHtml);
      // } else {
      // res.status(200).json({ post: post });
      // }

    } catch (err) {
      next(err);
    }
  }),
  //----- Get Single post -----//
  getSinglePost: asyncHandler(async (req, res, next) => {
    try {
      const postId = req.query.postId;
      if (!postId) return res.status(400).json({ message: "Provide post id" });
      const post = await Post.findById(postId);

      res.status(200).json({ post: post });

    } catch (err) {
      next(err);
    }
  }),

  //----- Get list of posts -----//
  getPosts: asyncHandler(async (req, res, next) => {
    try {
      const posts = await Post.find({});
      res.status(200).json({ posts: posts });
    } catch (err) {
      next(err);
    }
  }),

  //----- Delete Post -----//
  deletePost: asyncHandler(async (req, res, next) => {
    try {
      const postId = req.body.postId;
      if (!postId) return res.status(400).json({ message: "Provide post id" });
      await Post.findByIdAndDelete(postId);
      res.status(200).json({ message: "Successfully Deleted!" });
    } catch (err) {
      next(err);
    }
  }),

  //----- Search Post -----//
  search: asyncHandler(async (req, res, next) => {
    try {
      const title = req.query.title;
      const posts = await Post.find({ title: title });
      res.status(200).json({ posts });
    } catch (err) {
      next(err);
    }
  }),
};

module.exports = methods;
