const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("./authentication/tokenSecret");

const db = require("./UsersModel");

const router = express.Router();

router.get("/", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json({ success: true, users });
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.get("/:input", (req, res) => {
  const { input } = req.params;
  console.log(`UserRoutes: get -> input`, input);
  let i = -1;
  try {
    let x = parseInt(input, 10);
    if (!isNaN(x)) i = x;
  } catch {}  //Ignore any error.
  console.log(`UserRoutes: get -> parseInt(input)`, i);
  if (i > 0) {
    db.findById(i)
      .then(user => {
        res.status(200).json({ success: true, user });
      })
      .catch(err => {
        res.status(500).json({ success: false, err });
      });
  } else {
    db.findBy(input)
      .then(user => {
        res.status(200).json({ success: true, user });
      })
      .catch(err => {
        res.status(500).json({ success: false, err });
      });
  };
});

router.post("/register", (req, res) => {
  let newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 7);
  newUser.password = hash;

  if (newUser.username !== "" && newUser.password !== "") {
    db.add(newUser)
      .then(user => {
        console.log(`UsersRoutes: post/register -> username '${newUser.username}', password '${newUser.password}'`);
        res.status(201).json({ success: true, loginInfo: user });
      })
      .catch(err => {
        console.log(`UsersRoutes: post/register -> 500 error: ${err}`);
        res.status(500).json({ error: err });
      });
  } else {
    res.status(500).json({ success: false, message: `Empty username (${newUser.username}) or password (${newUser.password})` });
  };
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  console.log(`UsersRoutes: post/login -> username '${username}', password '${password}'`);
  if (username !== "" && password !== "") {
    db.findBy(username)
      .first()
      .then(login => {
        const bc = bcrypt.compareSync(password, login.password);
        // console.log(`UsersRoutes: post/login -> bc =`, bc);
        if (login && bc) {
          // console.log(`UsersRoutes: post/login -> login\n`, login);
          const token = Token(login);
          // console.log(`UsersRoutes: post/login -> token =`, token);
          const r = {
            message: `hello ${login.username}`,
            token,
            loginInfo: login
          };
          // console.log(`UsersRoutes: post/login -> return\n`, r);
          res.status(200).json(r);
        } else {
          res.status(401).json({ error: `Could not login ${login.username}` });
        }
      })
      .catch(err => {
        console.log(`UsersRoutes: post/login -> 500 error: ${err}`);
        res.status(500).json({ success: false, message: err });
      });
  } else {
    console.log(`UsersRoutes: post/login -> 500 error: Empty username (${username}) or password (${password})`);
    res.status(500).json({ success: false, message: `Empty username (${username}) or password (${password})` });
  };
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then(() => {
      res.status(203).json({ success: true, message: "Successfully deleted" });
    })
    .catch(err => {
      res.status(500).json({ success: false, message: err });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db
    .update(id, changes)
    .then(updatedUser => {
      res.status(202).json({ success: true, updatedUser: updatedUser });
    })
    .catch(err => {
      res.status(500).json({ success: false, message: err });
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
};

module.exports = router;
