require("dotenv").config();
const AWS = require("aws-sdk");
const fs = require("fs");

AWS.config.update({
  accessKeyId: process.env.awsAccessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.aws_region,
});

const s3 = new AWS.S3();

const SIGN_SCRIPT_PREFIX = `${__dirname}/SIGN_`;
const UPLOAD_TYPE_OPTIONS = ["ProfileImage"];
const Bucket = "sambayan-1";

/**
 * @param uploadType: enum ['ProfileImage', ...]
 * @param details: {fileType(String): MIME type of file}
 * @param calblack: fn(error, {signedRequest: url to upload to, objectId: id/name of file when uploaded})
 */
const uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: Bucket,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
};

/**
 * Gets an object from S3
 * @param objectKey: s3 key of object to get
 */
const getObject = (objectKey) => {
  return s3
    .getObject({
      Bucket,
      Key: objectKey,
    })
    .createReadStream();
};

/**
 * Gets an object from S3
 * @param objectKey: s3 key of object to get
 * @param callback: fn(error, isSuccess)
 */
const listObjects = (objectKey, callback) => {
  s3.listObjectsV2(
    {
      Bucket,
      Prefix: objectKey,
      MaxKeys: 1000,
    },
    callback
  );
};

/**
 * Deletes an object from S3
 * @param objectKey: s3 key of object to delete
 * @param callback: fn(error, isSuccess)
 */
const deleteObject = (objectKey, callback) => {
  const Bucket = "sambayan-1";
  s3.deleteObject(
    {
      Bucket,
      Key: objectKey,
    },
    callback
  );
};

module.exports = { uploadFile, deleteObject, getObject, listObjects };
