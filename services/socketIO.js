const socketio = require("socket.io");

let io = null;

exports.initialize = function (server) {
  if (io !== null) return io;
  io = socketio(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  return io;
};

exports.getIO = () => io;
