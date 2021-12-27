const yup = require("yup");

const sendChatMessageSchema = yup.object().shape({
  chatRoom: yup.string().required(),
  customIdentifier: yup.string().required(),
  message: yup.string().trim().min(0).required(),
  tags: yup.array().of(
    yup.object({
      startIndex: yup
        .number("Invalid Tag Start Index")
        .min(0)
        .required("Tag start index is required"),
      endIndex: yup
        .number("Invalid Tag End Index")
        .min(0)
        .required("Tag end index is required"),
      user: yup.string().required("Taged user ID is required"),
    })
  ),
});

const messageDeleteSchema = yup.object().shape({
  messageId: yup.string().required(),
});

const messageSeenSchema = yup.object().shape({
  messageId: yup.string().required(),
});

const messageDeliveredSchema = yup.object().shape({
  messageId: yup.string().required(),
});

module.exports = {
  sendChatMessageSchema,
  messageSeenSchema,
  messageDeliveredSchema,
};
