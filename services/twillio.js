const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendMessage = (content, receiver) => {
  client.messages
    .create({
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      from: process.env.TWILLIO_NUMBER,
      to: "+923314000256",
    })
    .then((message) => console.log(message.sid));
};

module.exports = sendMessage;
