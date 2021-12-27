const entities = require("html-entities");
const extend = require("extend");
const { Expo } = require("expo-server-sdk");
const expo = new Expo();
const User = require("../models/User/User");
const ExpoPushNotificationReceipt = require("../models/Notification/ExpoPushNotificationReceipt");
// NOTE: this should live in the User model file
const DEFAULT_NOTIFICATION_PREFS = {
  fcmPushTokens: [],
  pushDisabled: false,
};

/**
 * Sends push notifications. Gets associated receipts and handles error messages
 * @param {[ParsedNoti]} parsedNotis - ParsedNoti: {recipient(User), notificationTitle, notificationBody, categoryId, path(ex. '/post/postId')}
 */
async function sendPushNotifications(parsedNotis) {
  try {
    // get expo tokens from recipient object, and create a copy of a push noti for each one for that given recipient
    let messages = [];
    for (let noti of parsedNotis) {
      const {
        notificationId,
        recipient,
        notificationTitle,
        notificationBody,
        path,
      } = noti;

      const pushTokens =
        (recipient.notificationPreferences &&
          recipient.notificationPreferences.expoPushTokens) ||
        [];
      let tokenExists;
      for (let pushToken of pushTokens) {
        if (!Expo.isExpoPushToken(pushToken)) {
          helpers.unregisterExpoPushToken(recipient._id, pushToken).then(() => {
            /*best attempt*/
          });
          continue;
        }

        let notiDoc = {
          to: pushToken,
          sound: "default",
          body: entities.decode(notificationBody),
          data: { path, notificationId },
          owner: recipient._id,
        };

        if (notificationTitle) {
          notiDoc.title = entities.decode(notificationTitle);
        }
        messages.push(notiDoc);
      }
    }
    if (messages.length) {
      sendNotificationsWithExponentialBackoff(messages, 2000, 9);
    }
  } catch (error) {
    console.log("Error", error);
    return error;
  }
}

function sendNotificationsWithExponentialBackoff(
  messages,
  delaySeconds,
  subsequentAttemptsCount
) {
  if (subsequentAttemptsCount > 0 && messages.length) {
    setTimeout(async () => {
      try {
        const messagesToRetry = await sendNotifications(messages);
        sendNotificationsWithExponentialBackoff(
          messagesToRetry,
          delaySeconds * delaySeconds,
          --subsequentAttemptsCount
        );
      } catch (e) {
        /* we tried */
      }
    }, delaySeconds);
  }
}
async function sendNotifications(messages) {
  // send only one message a time because of expo's issues
  const chunks = messages.map((doc) => [doc]); // expo.chunkPushNotifications(messages);
  let ticketMessagePairs = [];
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      ticketMessagePairs.push(
        ...ticketChunk.map((ticket, i) => ({
          ticket,
          message: chunk[i],
        }))
      );
    } catch (e) {
      console.log(new Error(`Error sending push notifications. ${e.message}`));
    }
  }

  // clean up tickets with errors
  let messagesToRetry = [];
  let receiptIdMessagePair = [];
  for (let ticketMessagePair of ticketMessagePairs) {
    const { ticket, message } = ticketMessagePair;
    if (ticket.status == "error") {
      if (ticket.details) {
        if (ticket.details.error == "DeviceNotRegistered") {
          const pushToken = message.to;
          if (pushToken) {
            helpers.unregisterExpoPushTokenWithPushToken(pushToken).then(() => {
              /*best attempt*/
            });
          }
        } else if (ticket.details.error == "MessageRateExceeded") {
          messagesToRetry.push(message);
        } else {
          console.log(
            "Error sending notification. Notification ticket:",
            ticket
          );
        }
      } else {
        console.log("Error sending notification. Notification ticket:", ticket);
      }
    } else {
      receiptIdMessagePair.push({
        receiptId: ticket.id,
        message,
      });
    }
  }
  const now = new Date();
  try {
    await ExpoPushNotificationReceipt.insertMany(
      receiptIdMessagePair.map((pair) =>
        extend(pair, {
          created: now,
        })
      )
    );
  } catch (e) {
    console.log("Error making inserting documents to Database ", e);
    /* we tried */
  }
  return messagesToRetry;
}

/**
 * Processes and removes push notification receipts that are now available by Expo's API
 * NOTE: This should run on a chron job every ~30min
 */
async function processRipenedExpoPushNotificationReceipts() {
  // extract necessary receipt info
  let receiptDocuments;
  try {
    receiptDocuments = await ExpoPushNotificationReceipt.find({
      "message.type": { $ne: "Funnels" },
    });
  } catch (e) {
    console.log(
      "Error fetching documents to delete for ExpoPushNotification",
      e
    );
    return; // we tried....
  }
  const receiptIdToMessageMap = receiptDocuments.reduce((map, doc) => {
    map[doc.receiptId] = doc.message;
    return map;
  }, {});
  const receiptIds = receiptDocuments.map((receipt) => receipt.receiptId);
  const documentIdsToDelete = receiptDocuments.map((receipt) => receipt._id);
  // process receipts
  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  let messagesToResend = [];
  for (let chunk of receiptIdChunks) {
    let receiptsMap;
    try {
      receiptsMap = await expo.getPushNotificationReceiptsAsync(chunk); // obj:{receiptId -> receipt}
    } catch (e) {
      return console.log("Error getting receipts from expo:", e);
    }
    for (let receiptId of Object.keys(receiptsMap)) {
      const receipt = receiptsMap[receiptId];
      const message = receiptIdToMessageMap[receiptId];
      if (receipt.status === "ok") {
        continue;
      } else if (receipt.status === "error") {
        if (receipt.details && receipt.details.error) {
          if (receipt.details.error == "DeviceNotRegistered") {
            const pushToken = message.to;
            if (pushToken) {
              helpers
                .unregisterExpoPushTokenWithPushToken(pushToken)
                .then(() => {
                  /*best attempt*/
                });
            }
          } else if (receipt.details.error == "MessageRateExceeded") {
            messagesToResend.push(message);
          } else {
            console.log(
              "Expo notification receipt produced an error:",
              receipt
            );
          }
        } else {
          console.log("Expo notification receipt produced an error:", receipt);
        }
      }
    }
  }

  // clear relevant docs
  try {
    await ExpoPushNotificationReceipt.deleteMany({
      _id: { $in: documentIdsToDelete },
    });
  } catch (e) {
    /*we tried*/
  }

  // resend necessary messages
  sendNotificationsWithExponentialBackoff(messagesToResend, 2000, 5);
}

module.exports = {
  send: sendPushNotifications,
  processRipenedExpoPushNotificationReceipts,
};

const helpers = {
  /**
   * For unregistering a certain push token from the user's account
   */
  unregisterExpoPushToken: async function (callerId, expoPushToken, callback) {
    let user;
    try {
      user = await getUserWithNotificationPrefsOrDefault(callerId);
    } catch (e) {
      return callback(new Error("Error finding user"));
    }
    const index =
      user.notificationPreferences.expoPushTokens.indexOf(expoPushToken);
    if (index == -1) {
      return callback(null, true);
    } else {
      user.notificationPreferences.expoPushTokens.splice(index, 1);
      user.save({ validateBeforeSave: true }, callback);
    }
  },
  getUserWithNotificationPrefsOrDefault1: function (userId, callback) {
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return callback(new Error("User not found"));
        } else if (
          user.notificationPreferences &&
          user.chatNotificationPreferences
        ) {
          return callback(null, user);
        } else {
          if (!user.notificationPreferences) {
            user.notificationPreferences = DEFAULT_NOTIFICATION_PREFS;
          }
          user.save({ validateBeforeSave: true }, callback);
        }
      })
      .catch((err) => callback(err));
  },

  markNotificationSent: async function (callerId) {
    try {
      const user = User.updateOne(
        {
          _id: callerId,
        },
        {
          $set: { "notificationPreferences.lastPushSentDate": new Date() },
        }
      );
      return user;
    } catch (error) {
      return error;
    }
  },

  /**
   * For unregistering a certain push token from the user's account
   */
  unregisterExpoPushTokenWithPushToken: function (expoPushToken) {
    try {
      const user = User.updateOne(
        {
          "notificationPreferences.expoPushTokens": expoPushToken,
        },
        {
          $pull: { "notificationPreferences.expoPushTokens": expoPushToken },
        }
      );
      return user;
    } catch (error) {
      console.log("ert", error);
      return error;
    }
  },
};
