const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const dotenv = require("dotenv").config();
const passport = require("passport");
const cookieParser = require("cookie-parser");
var path = require("path");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
var cors = require("cors");
var mustacheExpress = require("mustache-express");
const http = require("http");

const app = express();
app.use(cors());

const server = http.createServer(app);
//configuring socket io
const socketIO = require("./services/socketIO");
require("./socket.io/configure")(socketIO.initialize(server));

app.engine("html", mustacheExpress());
app.set("view engine", "html");

//// Body Parser Middleware ////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit:'50mb'})); 
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'})); 

//// Cookie Parser ////
app.use(cookieParser());

//// DataBase Connection ////
mongoose
  .connect(process.env.MONGO_LOCAL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database has connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// Initializing Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//// Routes ////
const auth = require("./routes/pub/auth");
const user = require("./routes/secure/user");
const site = require("./routes/secure/site");
const post = require("./routes/secure/post");
const event = require("./routes/secure/event");
const community = require("./routes/secure/community");
const candidate = require("./routes/secure/candidate");
const party = require("./routes/secure/party");
const convenor = require("./routes/secure/convenor");
const channel = require("./routes/secure/channel");
const poll = require("./routes/secure/poll");
const position = require("./routes/secure/position");
const notification = require("./routes/secure/notification");
const chatMessage = require("./routes/secure/chat/messages");
const chatRoom = require("./routes/secure/chat/rooms");

// const aws_s3 = require("./routes/pub/s3");

//----- Mount Routers -----//

app.use("/api/pub/auth", auth);
app.use("/api/secure/user", user);
app.use("/api/secure/site", site);
app.use("/api/secure/post", post);
app.use("/api/secure/event", event);
app.use("/api/secure/community", community);
app.use("/api/secure/candidate", candidate);
app.use("/api/secure/party", party);
app.use("/api/secure/channel", channel);
app.use("/api/secure/poll", poll);
app.use("/api/secure/position", position);
app.use("/api/secure/convenor", convenor);
app.use("/api/secure/notification", notification);
app.use("/api/secure/chat-message", chatMessage);
app.use("/api/secure/chat-room", chatRoom);

// app.use("/api/pub/aws-s3", aws_s3);

//// Error Handler
app.use((error, req, res, next) => {
  console.log("Main Error =>", error);
  const message = error.message;
  const status = error.status || 500;
  res.status(status).json({ message: message, error: error });
});

app.use("/views/uploads", express.static(path.join("views", "uploads")));
app.use(express.static("pdfImgaes"));
app.use(express.static(path.join(__dirname, "client/build", "index.html")));

if (process.env.client == "./client/public/templates/") {
  app.use(express.static("static"));
} else {
  app.use(express.static(path.join(__dirname, "client/build")));
}

if (app.get("env") === "production") {
  app.use(function (req, res, next) {
    var protocol = req.get("x-forwarded-proto");
    protocol == "https"
      ? next()
      : res.redirect("https://" + req.hostname + req.url);
  });
}
var port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Listening to port " + `${port}`);
});
server.timeout = 120000;
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
