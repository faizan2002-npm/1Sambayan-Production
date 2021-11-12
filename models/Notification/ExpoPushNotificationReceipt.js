const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expoPushNotificationReceiptsSchema = new Schema({
  created: {
    type: Date,
    required: true,
  },
  receiptId: {
    type: String,
    required: true,
  },
  message: {
    to: String,
    sound: String,
    body: String,
    data: Schema.Types.Mixed,
    owner: {
      type: Schema.ObjectId,
      ref: "users",
      index: true,
    },
  },
});

const ExpoPushNotificationReceipt = mongoose.model(
  "expopushnotificationreceipts",
  expoPushNotificationReceiptsSchema
);
module.exports = ExpoPushNotificationReceipt;
