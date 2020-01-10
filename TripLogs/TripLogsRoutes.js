const express = require("express");
const tripLogsDb = require("./TripLogsModel.js");
const Logs_BaitDb = require("../Logs_Bait/Logs_BaitModel.js");
const fishDb = require("../Fish/FishModel.js");
const router = express.Router();

const combineObj = require("../utils/CombineObjLogs.js");

router.get("/", (req, res) => {
  tripLogsDb
    .find()
    .then(logList => {
      //getLogs from call
      // console.log(logList);
      // let logs = combineObj(logList);
      logList.forEach(log => {
        log.fish_list = fishDb.findByLogId(log.log_id);
      });

      res.status(200).json({ success: true, logList });
    })
    .catch(err => {
      res.status(500).json({ success: false, message: "Server error", err });
    });
});

router.post("/:id", (req, res) => {
  let newLog = req.body.log;
  let baitList = req.body.bait;
  newLog.accounts_id = req.params.id;

  if (newLog && newLog !== "" && newLog.length > 0) {
    tripLogsDb
      .add(newLog)
      .then(addedLog => {
        //inserting into the bridge table by iterating over the bait array
        baitList.forEach(bait => {
          Logs_BaitDb.add({
            log_id: addedLog.log_id,
            bait_id: bait.bait_id
          });
        });
        //after that works then send 201 response that the log was added
        res.status(201).json({ success: true, addedLog });
      })
      .catch(err => {
        res.status(501).json({ success: false, message: "Server error", err });
      });
  } else {
    res
      .status(401)
      .json({ success: false, message: "No log passed into body" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  tripLogsDb
    .remove(id)
    .then(() => {
      res.status(203).json({ success: true, message: "Successfully deleted" });
    })
    .catch(err => {
      res.status(503).json({ success: false, message: err });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  tripLogsDb
    .update(id, changes)
    .then(updatedLog => {
      res.status(202).json({ success: true, updatedLog: updatedLog });
    })
    .catch(err => {
      res.status(502).json({ success: false, message: err });
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

router.get("/:id/fish", (req, res) => {
  let { id } = req.params;
  fishDb
    .findByLogId(id)
    .then(fish => {
      if (fish) {
        res.status(200).json({ success: true, fish });
      } else {
        res.status(400).json({ success: false, message: "Log ID not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, message: "Server error", err });
    });
});

module.exports = router;
