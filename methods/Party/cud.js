const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const asyncHandler = require("../../middlewares/async");
const Site = require("../../models/Site/Site");
const Party = require("../../models/Party/Party");

const methods = {
  //----- Create Header -----//
  create: asyncHandler(async (req, res, next) => {
    try {
      const { title, email, password } = req.body;

      //// Check If user exist with this Email or not ////
      const result = await Party.findOne({ email: email });
      const hashedPassword = await helpers.genHashPassword(password);

      if (result) {
        res.status(404).send("User already registered with this Email Address");
      } else {
        let image;
        if (req.file) {
          image = req.file.filename;
        }

        const ownerId = req.user._id;

        // Saving User in DataBase
        const party = await Party.create({
          title,
          email,
          password:hashedPassword,
          image,
          owner: ownerId,
        });

        helpers.sendTokenResponse(party, 200, res);
      }
    } catch (err) {
      next(err);
    }
  }),

  //----- Update Site Header -----//
  update: asyncHandler(async (req, res, next) => {
    try {
      const { title,email, partyId } = req.body;
      let image;
      if (req.file) {
        image = req.file.filename;
      }
      let party = await Party.findById(partyId);

      if (title) {
        party.title = title;
      }
      if (email) {
        party.email = email;
      }
      if (image) {
        party.image = image;
      }

      const updatedparty = await party.save();

      res.status(200).json({ message: "Success!", party: updatedparty });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get site Header -----//
  getParty: asyncHandler(async (req, res, next) => {
    try {
      const partyId = req.query.partyId;
      // console.log('req.query',req.query)
      const party = await Party.findById(partyId);
      res.status(200).json({ party: party });
    } catch (err) {
      next(err);
    }
  }),

  //----- Delete Event -----//
  deleteParty: asyncHandler(async (req, res, next) => {
    try {
      // console.log(req.body);
      const postId = req.body.postId;
      if (!postId) return res.status(400).json({ message: "Provide post id" });
      await Party.findByIdAndDelete(postId);
      res.status(200).json({ message: "Successfully Deleted!" });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get list of site headers -----//
  getParties: asyncHandler(async (req, res, next) => {
    try {
      const parties = await Party.find({});
      res.status(200).json({ parties: parties });
    } catch (err) {
      next(err);
    }
  }),
};

module.exports = methods;


const helpers = {
  //Get token from Model create cookie and send response
  sendTokenResponse: (user, statusCode, res) => {
    //create token

    const token = user.getSignedJwtToken();

    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") {
      options.secure = true;
    }
    if (user) {
      res
        .status(statusCode)
        .cookie("token", token, options)
        .json({ token: token, user: user });
    } else {
      res.send("Invalid Permissions");
    }
  },

  //Encrypt Password
  genHashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  },
};
