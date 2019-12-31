const jwt = require("jsonwebtoken");
const secret = require("./tokenSecret");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("token", token);
  if (token) {
    jwt.verify(token, secret.secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "login" });
      } else {
        req.user = {
          username: decodedToken.username
        };
        next();
      }
    });
  } else {
    res.status(401).json({ message: "no token" });
  }
};
