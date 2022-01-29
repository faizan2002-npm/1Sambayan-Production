const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const asyncHandler = require("../../middlewares/async");
const User = require("../../models/User/User");
const sendEmail = require("../../services/sendEmail");
const sendSms = require("../../services/twillio");
const Party = require("../../models/Party/Party");

//REGISTER USER API
const methods = {
  registerUser: asyncHandler(async (req, res, next) => {
    try {
      const {
        firstName,
        middleName,
        lastName,
        email,
        age,
        password,
        confirm_password,
        address,
        profession,
        barangay,
        phone,
        fbLink,
        partyId,
        expoPushToken,
        fcmPushToken,
      } = req.body;
      //// Check If Password and Confirm Password are same or not ////
      if (password !== confirm_password) {
        res.status(403).send("Password and Confirm Password are not same");
      }

      //// Check If user exist with this Email or not ////
      const result = await User.findOne({ email: email });
      const hashedPassword = await helpers.genHashPassword(password);

      if (result) {
        res
          .status(400)
          .json({ message: "User already registered with this Email Address" });
      } else {
        // Saving User in DataBase
        let expoToken = [];
        let fcmToken = [];
        if (expoPushToken) {
          expoToken.push(expoPushToken);
        }
        if (fcmPushToken) {
          fcmToken.push(fcmPushToken);
        }
        const user = await User.create({
          firstName,
          middleName,
          lastName,
          email,
          age,
          partyId,
          address,
          address,
          profession,
          barangay,
          password: hashedPassword,
          phone,
          fbLink,
          notificationPreferences: {
            expoPushTokens: [...expoToken],

            fcmPushTokens: [...fcmToken],
          },
        });
        console.log("req.body", req.body);
        console.log("user", user);
        helpers.sendTokenResponse(user, 200, res);
        // return res.status(200).json({ user: user });
      }
    } catch (err) {
      next(err);
    }
  }),

  //---- GET all Users ----//
  getAllUsers: asyncHandler(async (req, res, next) => {
    try {
      const users = await User.find({ role: "user", isDeleted: false });
      return res.status(200).json({ users });
    } catch (err) {
      next(err);
    }
  }),
  getAllUsersByParty: asyncHandler(async (req, res, next) => {
    let partyId = req.query.partyId;

    try {
      const users = await User.find({
        role: "user",
        isDeleted: false,
        partyId,
      });
      return res.status(200).json({ users });
    } catch (err) {
      next(err);
    }
  }),

  //---- Delete USER  ----//
  deleteUser: asyncHandler(async (req, res, next) => {
    try {
      // console.log("req.body", req.body);
      const userId = req.body.userId;
      await User.findByIdAndUpdate(
        userId,
        {
          isDeleted: true,
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "User has been deleted successfully" });
    } catch (err) {
      next(err);
    }
  }),

  // Email Verfication for new Registrations //
  verifyEmail: asyncHandler(async (req, res, next) => {
    async.waterfall(
      [
        function (done) {
          crypto.randomBytes(20, function (err, buf) {
            var token = buf.toString("hex");
            done(err, token);
          });
        },
        function (token, done) {
          const email = req.body.email;
          User.findOne(
            {
              email: email,
            },
            function (err, user) {
              if (!user) {
                return res.status(403).json({
                  message: "No account with that email address exists",
                });
              }
              User.findOneAndUpdate(
                { email: email },
                {
                  $set: {
                    verifyEmailToken: token,
                    emailVerificationExpiresIn: Date.now() + 36000000,
                  },
                },
                { new: true },
                function (err) {
                  done(err, token, user);
                }
              );
            }
          );
        },
        function (token, user, done) {
          let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            tls: {
              rejectUnauthorized: false,
            },
            auth: {
              user: process.env.MailingId,
              pass: process.env.MailingPassword,
            },
          });
          var mailOptions = {
            to: user.email,
            from: process.env.MailingId,
            subject: "Verfication Email Request for WINA",
            text:
              "You are receiving this because you (or someone else) have requested to register your account on WINA.\n\n" +
              "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
              "http://" +
              req.headers.host +
              "/reset/" +
              token +
              "\n\n" +
              "If you did not request this, please ignore this email.\n",
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res.status(400).json({ message: error.message });
            }
            res
              .status(200)
              .json({ message: "Verification Email has been sent" });
          });
        },
      ],
      function (err) {
        if (err) return next(err);
        res.status(200).send("Verfication Email has been sent Successfully");
      }
    );
  }),

  verifyEmailProcess: asyncHandler(async (req, res, next) => {
    async.waterfall(
      [
        function (done) {
          User.findOne(
            {
              verifyEmailToken: req.params.token,
              emailVerificationExpiresIn: {
                $gt: Date.now(),
              },
            },
            async function (err, user) {
              if (!user) {
                return res.status(403).json({
                  message: "Password reset token is invalid or has expired",
                });
              } else {
                var user = await User.findOneAndUpdate(
                  {
                    verifyEmailToken: req.params.token,
                  },
                  {
                    $set: {
                      status: "active",
                    },
                  }
                );

                let transporter = nodemailer.createTransport({
                  host: "smtp.gmail.com",
                  port: 587,
                  secure: false,
                  tls: {
                    rejectUnauthorized: false,
                  },
                  auth: {
                    user: process.env.MailingId,
                    pass: process.env.MailingPassword,
                  },
                });
                var mailOptions = {
                  to: user.email,
                  from: process.env.MailingId,
                  subject: "Success Message",
                  text:
                    "Hello,\n\n" +
                    "You have successfully verified " +
                    user.email +
                    " \n",
                };
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    return res.status(400).json({ message: error.message });
                  }
                  res.status(200).json({
                    message: "Success! You have successfully registed on WINA",
                  });
                  done(err);
                });
              }
            }
          );
        },
      ],
      function (err) {
        console.log(err);
      }
    );
  }),

  //Login User
  login: asyncHandler(async (req, res, next) => {
    const { email, password, expoPushToken, fcmPushToken } = req.body;
    const schema = Joi.object().keys({
      email: Joi.string().max(40).required().email(),
      password: Joi.string().min(6).max(255).required(),
      expoPushToken: Joi.string(),
      fcmPushToken: Joi.string(),
    });

    const results = schema.validate(req.body);
    if (results.error) {
      return res.status(400).send(results.error.details[0].message);
    }

    //validating email and password
    if (!email || !password) {
      return res.status(400).send("Please provide email and password");
    }
    const getUser = await User.findOne({
      email: email,
    }).select("+password");
    if (!getUser) {
      const party = await Party.findOne({
        email: email,
      }).select("+password");
      if (party) {
        const isMatch = await party.matchPassword(password);
        if (!isMatch) {
          return res.status(400).send("Password is Invalid");
        }
        const isDeleteed = await Party.findOne({
          isDeleted: false,
          email: email,
        });
        if (!isDeleteed) {
          return res.status(400).send("Party Deleted by Admin");
        }
        helpers.sendTokenResponse(party, 200, res);
      } else {
        return res.status(400).send("You are not registered, Please Sign up!");
      }
    } else {
      const isMatch = await getUser.matchPassword(password);
      if (!isMatch) {
        return res.status(400).send("Password is Invalid");
      }
      const isDeleteed = await User.findOne({
        email: email,
        isDeleted: false,
      });
      if (!isDeleteed) {
        return res.status(400).send("User Deleted by Admin");
      }
      if (expoPushToken) {
        getUser.notificationPreferences.expoPushTokens.push(expoPushToken);
      }
      if (fcmPushToken) {
        getUser.notificationPreferences.fcmPushTokens.push(fcmPushToken);
      }
      const user = await getUser.save();
      helpers.sendTokenResponse(user, 200, res);
    }
  }),

  // USER Logout
  logout: asyncHandler(async (req, res, next) => {
    req.session.destroy(() => {
      req.logOut();
      res.clearCookie("token");
      return res.status(200).send("Logged out successfully");
    });
  }),

  //----- Mail to reset password ----//
  mailForResetPassword: asyncHandler(async (req, res, next) => {
    try {
      const email = req.body.email;
      const user = await User.findOne({ email: email });
      if (user) {
        const resetToken = await user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });
        const message = `You are receiving this email because you or someone else has requested the password for your account with 1SAMBAYAN, to be reset.
        If it is not you, who has requested the password to be reset, please ignore this mail.
        If you have requested for the password to be reset, please click on the link listed below.
        ${process.env.BASE_URL}/auth/setNewPassword?token=${resetToken}`;

        try {
          await sendEmail({
            email: user.email,
            subject: "1SAMBAYAN - Password rest request",
            message: message,
          });
          return res.status(200).json({ success: true, data: "Email sent" });
        } catch (error) {
          return res.status(404).json({ message: "Internelm Error" });
        }
      } else {
        const party = await Party.findOne({ email: email });
        // console.log("party", party);
        const resetToken = await party.getResetPasswordToken();
        // console.log("resetToken", resetToken);
        await party.save({ validateBeforeSave: false });
        const message = `You are receiving this email because you or someone else has requested the password for your account with 1SAMBAYAN, to be reset.
        If it is not you, who has requested the password to be reset, please ignore this mail.
        If you have requested for the password to be reset, please click on the link listed below.
        ${process.env.BASE_URL}/auth/setNewPassword?token=${resetToken}`;

        try {
          await sendEmail({
            email: party.email,
            subject: "1SAMBAYAN - Password rest request",
            message: message,
          });
          return res.status(200).json({ success: true, data: "Email sent" });
        } catch (error) {
          return res.status(404).json({ message: "Internelm Error" });
        }
      }
    } catch (err) {
      next(err);
    }
  }),

  //----- Reset password ----//
  resetPassword: asyncHandler(async (req, res, next) => {
    try {
      const resetPasswordToken = req.query.resetPasswordToken;
      const password = req.body.password;
      const hashedPassword = await helpers.genHashPassword(password);
      let user = await User.findOne({ resetPasswordToken: resetPasswordToken });
      let party = await Party.findOne({
        resetPasswordToken: resetPasswordToken,
      });
      if (user) {
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.restPasswordExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return res
          .status(200)
          .json({ message: "Password has been Updated successfully" });
      } else if (party) {
        party.password = hashedPassword;
        party.resetPasswordToken = undefined;
        party.restPasswordExpires = undefined;
        await party.save({ validateBeforeSave: false });
        return res
          .status(200)
          .json({ message: "Password has been Updated successfully" });
      } else {
        return res.status(400).json({ message: "Register First" });
      }
    } catch (error) {
      next(error);
    }
  }),

  //----- Verify Phone Number ----//
  verifyPhone: asyncHandler(async (req, res, next) => {
    try {
      const phone = req.body.phone;
      const messageToSend = "HELLO";
      const sendOtp = await sendSms(messageToSend, phone);
      return res.status(200).json({ message: "success!" });
    } catch (error) {
      next(error);
    }
  }),
  contactUs: asyncHandler(async (req, res, next) => {
    try {
      const { name, email, phone, subject, message } = req.body;
      const messageBody = `You are receiving this email because someone has filled Contact Us Form. Please have a look:
      Name: ${name},
      Email: ${email},
      Phone: ${phone},
      Message: ${message}`;

      await sendEmail({
        from: email,
        email: "1SAMBAYAN.Secretariat@gmail.com",
        subject,
        message: messageBody,
      });
      return res.status(200).json({ success: true, data: "Email sent" });
    } catch (error) {
      next(error);
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
        .json({ token: token, user });
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
