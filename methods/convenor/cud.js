const nodemailer = require("nodemailer");
const asyncHandler = require("../../middlewares/async");
const Site = require("../../models/Site/Site");
const Convenor = require("../../models/Convenor/Convenor");

const methods = {
  //----- Create Convenor -----//
  create: asyncHandler(async (req, res, next) => {
    try {
      const { title, description,desigination } = req.body;
      let image;

      if (req.files.image) {
        image = req.files.image[0].filename;
      }
      const ownerId = req.user._id;
      // Saving User in DataBase
      const convenor = await Convenor.create({
        title,
        description,
        image,
        desigination,
        owner: ownerId,
      });

      res.status(200).json({ convenor: convenor });
    } catch (err) {
      next(err);
    }
  }),

  //----- Update Convenor -----//
  update: asyncHandler(async (req, res, next) => {
    try {
      console.log('req.body',req.body);
      const { title, description, postId,desigination } = req.body;
      let image;
      if (req.files.image) {
        image = req.files.image[0].filename;
      }
      let convenor = await Convenor.findById(postId);
      if (title) {
        convenor.title = title;
      }
      if(desigination){
        convenor.desigination = desigination;
      }
      if (description) {
        convenor.description = description;
      }
      if (image) {
        convenor.image = image;
      }

      const updatedConvenor = await convenor.save();

      res.status(200).json({ message: "Success!", convenor: updatedConvenor });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get Convenor -----//
  getConvenor: asyncHandler(async (req, res, next) => {
    try {
      const postId = req.query.postId;
      if (!postId) return res.status(400).json({ message: "Provide Convenor ID" });
      const convenor = await Convenor.findById(postId);
      res.status(200).json({ convenor: convenor });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get list of Convenors -----//
  getConvenors: asyncHandler(async (req, res, next) => {
    try {
      const convenors = await Convenor.find({});
      res.status(200).json({ convenors: convenors });
    } catch (err) {
      next(err);
    }
  }),

  //----- Delete Convenor -----//
  deleteConvenor: asyncHandler(async (req, res, next) => {
    try {
      console.log(req.body);
      const postId = req.body.postId;
      if (!postId) return res.status(400).json({ message: "Provide Convenor id" });
      await Convenor.findByIdAndDelete(postId);
      res.status(200).json({ message: "Successfully Deleted!" });
    } catch (err) {
      next(err);
    }
  }),

};

module.exports = methods;
