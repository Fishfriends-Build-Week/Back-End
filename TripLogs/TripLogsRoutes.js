const express = require("express");
const tripLogsDb = require("./TripLogsModel.js");
const router = express.Router();

router.get("/", (req, res) => {
  tripLogsDb
    .find()
    .then(logs => {
      res.status(200).json({ success: true, logs });
    })
    .catch(err => {
      res.status(500).json({ success: false, message: "Server error", err });
    });
});

router.post("/", (req, res) => {
  let newLog = req.body;

  tripLogsDb
    .add(newLog)
    .then(addedLog => {
      res.status(201).json({ success: true, addedLog });
    })
    .catch(err => {
      res.status(501).json({ success: false, message: "Server error", err });
    });
});

module.exports = router;
