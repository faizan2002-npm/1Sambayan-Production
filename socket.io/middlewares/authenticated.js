const AuthSession = require("../../models/AuthSession");
const jwt = require("../../services/jwt");
const User = require("../../models/User/User");

const authenticated = async (socket, next) => {
  let authSession = {};
  const token = socket.handshake.query["x-auth-token"];

  if (!token) return next(new Error("UNAUTHENTICATED"));
  try {
    const decoded = jwt.decrypt(token);

    const user = await User.findById(decoded.id);
    if (!user) return next(new Error("User does not exists"));

    if (user) {
      authSession.user = user;
    }
    if (!authSession) return next(new Error("UNAUTHENTICATED"));

    socket.user = user;

    next();
  } catch (ex) {
    console.log("ERRRR", ex);
    return next(ex);
  }
};

module.exports = authenticated;
