const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("./authentication/tokenSecret");

const db = require("./UsersModel");

const router = express.Router();

router.get("/", res => {
  db.find()
    .then(users => {
      res.status(200).json({ success: true, users });
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.post("/register", (req, res) => {
  let newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 7);
  newUser.password = hash;

  db.add(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(() => {
      res.status(500).json({ error: "could not complete" });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  db.findBy({ username })
    .first()
    .then(login => {
      if (login && bcrypt.compareSync(password, login.password)) {
        const token = Token(login);

        res.status(200).json({
          message: `hello ${login.username}`,
          token
        });
      } else {
        res.status(401).json({ error: `Could not login ${login.username}` });
      }
    });
});

//Token
function Token(user) {
  const payload = {
    username: user.username,
    password: user.password
  };
  const options = {
    expiresIn: "2 hours"
  };

  return jwt.sign(payload, secret.secret, options);
}

module.exports = router;
