const nodemailer = require("nodemailer");
const asyncHandler = require("../../middlewares/async");
const User = require("../../models/User/User");
const bcrypt = require("bcryptjs");




//REGISTER USER API
const methods = {
  //----- Forgot Password -----//
  forgotPassword: asyncHandler(async (req, res, next) => {
    try {
      const { oldPassword, newPassword, email } = req.body;
      if (!oldPassword && !newPassword && !email)
        return res.status(400).json({ message: "Missing fields" });

      //----- check if user exists in Database -----//
      let user = await User.findOne({ email: email }).select("password");
      if (!user)
        return res.status(401).json({ message: "Invalid Permissions" });

      const isPassword = await user.matchPassword(oldPassword);
      if (isPassword) {
        const newHashedPassword = await helpers.genHashPassword(newPassword);
        user.password = newHashedPassword;
        await user.save();
        return res
          .status(200)
          .json({ message: "Password updated successfully!" });
      } else {
        //----- Incorrect Password -----//
        return res.status(401).json({ message: "Invalid Permissions" });
      }
    } catch (err) {
      next(err);
    }
  }),

  //----- Edit Profile -----//
  getProfile: asyncHandler(async (req, res, next) => {
    try {
      const user = req.user;
      return res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  }),

  //----- Edit Profile -----//
  editProfile: asyncHandler(async (req, res, next) => {
    try {
      let {
        firstName,
        middleName,
        country,
        city,
        province,
        region,
        barangay,
        age,
        lastName,
        email,
        phone,
        profession,
        address,
        fbLink,
        partyId,
        userId,
      } = req.body;
      console.log('req.body', req.body)
      let image;
      if (req.file) {
        image = req.file.filename;
      }

      // let user = req.user;
      let user = await User.findById(userId);

      if (firstName) {
        user.firstName = firstName;
      }
      if (middleName || middleName == '') {
        user.middleName = middleName;
      }
      if (lastName) {
        user.lastName = lastName;
      }
      if (country) {
        user.country = country;
      }
      if (city) {
        user.city = city;
      }
      if (address) {
        user.address = address;
      }
      if (province) {
        user.province = province;
      }
      if (region) {
        user.region = region;
      }
      if (profession) {
        user.profession = profession;
      }
      if (barangay) {
        user.barangay = barangay;
      }
      if (email) {
        user.email = email;
      }
      if (age) {
        user.age = age;
      }
      if (fbLink) {
        user.fbLink = fbLink;
      }
      if (partyId) {
        user.partyId = partyId;
      }
      if (phone) {
        user.phone = phone;
      }
      if (image) {
        user.profileImage = image;
      }
      await user.save();
      return res.status(200).json({ message: "profile updated successfully!" });
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