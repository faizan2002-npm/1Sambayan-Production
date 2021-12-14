const AWS = require("aws-sdk");
const express = require("express");
const multer = require("multer");
var multerS3 = require('multer-s3')

AWS.config.update({
  accessKeyId: process.env.awsAccessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.aws_region,
});

const s3 = new AWS.S3();

// const storage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
//   destination: function (req, file, cb) {
//     cb(null, "views/uploads");
//   },
// });

const storage = multerS3({
  s3: s3,
  bucket: process.env.S3_BUCKET,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    console.log(file)
    cb(null, `${Date.now().toString()}${file.originalname}`)
  }
})

// const upload = multer({ storage: storage });
const upload = multer({ storage });
module.exports = upload;
