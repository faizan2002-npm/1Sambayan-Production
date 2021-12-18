const nodemailer = require("nodemailer");
const xoauth2 = require('xoauth2');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const sendMail = async (options) => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });
  const accessToken = oauth2Client.getAccessToken()
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: "gmail",
    tls: {
      rejectUnauthorized: false
    },
    auth: {
      type: "OAuth2",
      user: process.env.SMTP_EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken
    }
  });

  let message = {
    from: (options.from) ? `${process.env.FROM_NAME} <${options.from}>` : `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  const info = await transporter.sendMail(message);
  console.log("EMAIL HAS BEEN SENT SUCCESSFULLY", info.messageId);
};

module.exports = sendMail;
