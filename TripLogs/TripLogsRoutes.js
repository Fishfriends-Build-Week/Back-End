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

router.get("/search", (req, res) => {
  let locationQuery = req.body;

  if (locationQuery && locationQuery !== "") {
    tripLogsDb
      .findByLocation(locationQuery)
      .then(logs => {
        res.status(200).json({ success: true, logs });
      })
      .catch(err => {
        res.status(500).json({ success: false, err });
      });
  } else {
    res
      .status(400)
      .json({ success: false, message: "No search query provided" });
  }
});

router.get("/:id", (req, res) => {
  let { id } = req.params;

  tripLogsDb
    .findById(id)
    .then(log => {
      if (log) {
        res.status(200).json({ success: true, log });
      } else {
        res.status(400).json({ success: false, message: "Log ID not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, message: "Server error", err });
    });
});

module.exports = router;
