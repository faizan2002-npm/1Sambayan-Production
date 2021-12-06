const asyncHandler = require("../../middlewares/async");
// Controller Functions //
const { uploadFile, getObject } = require("../../services/aws");

const methods = {
  //----- Upload File -----//
  upload: asyncHandler(async (req, res, next) => {
    try {
      const file = req.file;
      if (!file) res.status(400).json({ message: "Invalid Parameters" });
      const result = await uploadFile(file);
      res.status(200).json({ result });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get File -----//
  getObject: asyncHandler(async (req, res, next) => {
    try {
      const key = req.body.objectKey;
      if (!key) res.status(400).json({ message: "Invalid Parameters" });
      const result = await getObject(file);
      return res.status(200).json({});
    } catch (err) {
      next(err);
    }
  }),
};

module.exports = methods;
