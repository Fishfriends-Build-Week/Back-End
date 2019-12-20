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

module.exports = router;
