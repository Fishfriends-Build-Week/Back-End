const express = require("express");
const tripLogsDb = require("./TripLogsModel.js");
const Logs_BaitDb = require("../Logs_Bait/Logs_BaitModel.js");
// const fishDb = require("../Fish/FishModel.js");
const router = express.Router();

const combineObj = require("../utils/CombineObjLogs.js");

router.get("/", (req, res) => {
  tripLogsDb
    .find()
    // .then(res => res.status(200).json({ success: true, res }))
    // .catch(err => res.status(500).json({ success: false, err }));
    .then(logList => {
      //getLogs from call
      let logs = combineObj(logList);

      res.status(200).json({ success: true, logs });
    })
    .catch(err => {
      res.status(500).json({ success: false, message: "Server error", err });
    });

  // const updateEachElement = arr => {
  //   console.log("array from second method", arr);
  //   let promise = new Promise((resolve, reject) => {
  //     let updatedArr = [];
  //     arr.forEach(item => {
  //       tripLogsDb.findFishByLogId(item.log_id).then(res => {
  //         console.log("response from second method .then", res);
  //         item.baitList = res;
  //         updatedArr.push(item);
  //         console.log("updatedArr from inside loop", updatedArr);
  //       });
  //       console.log("updatedArr from inside outer-shell loop", updatedArr);
  //     });
  //     console.log("array after loop in second method", updatedArr);
  //     resolve(updatedArr);
  //   });
  //   return promise;
  // };

  // const getLogs = () => {
  //   return tripLogsDb.find().then(logList => {

  //     console.log("first method complete", logList);
  //     return logList;
  //   });
  // };

  // getLogs()
  //   .then(res => updateEachElement(res))
  //   .then(updatedArr => res.status(200).json({ success: true, updatedArr }));
});

router.post("/:id", (req, res) => {
  let newLog = req.body.log;
  let baitList = req.body.bait;

  console.log(`TripLogsRoutes: post -> req.body\n`, req.body);
  console.log(`TripLogsRoutes: post -> newLog.length`, newLog.length);
  console.log(`TripLogsRoutes: post -> baitList.length`, baitList.length);

  console.log(`TripLogsRoutes: post got to line: `, 0);
  if (newLog && newLog !== "" && newLog.length > 0) {
    console.log(`TripLogsRoutes: post got to line: `, 1);
    newLog.forEach(innerLog => {
      innerLog.account_id = parseInt(req.params.id, 10);
      console.log(`TripLogsRoutes: innerLog\n`, innerLog);
      tripLogsDb
        .add(innerLog)
        .then(addedLog => {
          console.log(`TripLogsRoutes: post got to line: `, 2);
          // addedLog.log.account_id = req.params.id;
          console.log(`TripLogsRoutes: post got to line: `, 3);
          console.log(`TripLogsRoutes: post -> addedLog\n`, addedLog);
          //inserting into the bridge table by iterating over the bait array
          baitList.forEach(bait => {
            console.log(`TripLogsRoutes: post got to line: `, 4);
            console.log(`TripLogsRoutes: post => addedLog -> bait\n`, bait);
            Logs_BaitDb.add({
              log_id: addedLog.log_id,
              bait_id: bait.bait_id
            });
            console.log(`TripLogsRoutes: post got to line: `, 5);
          });
          console.log(`TripLogsRoutes: post got to line: `, 6);
          //after that works then send 201 response that the log was added
          res.status(201).json({ success: true, addedLog });
          console.log(`TripLogsRoutes: post got to line: `, 7);
        })
        .catch(err => {
          res.status(501).json({ success: false, message: "Server error", err });
        });
      console.log(`TripLogsRoutes: post got to line: `, 8);
    });
  } else {
    res
      .status(401)
      .json({ success: false, message: "No log passed into body" });
  }
  console.log(`TripLogsRoutes: post got to line: `, 9);
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

router.get("/search/:locationQuery", (req, res) => {
  let { locationQuery } = req.params;
  // console.log(`TripLogRoutes: search -> locationQuery`, `'${locationQuery}'`);

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
  console.log("id from fishfinder", id);
  tripLogsDb
    .findFishByLogId(id)
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

router.get("/:id/bait", (req, res) => {
  let { id } = req.params;
  console.log("id from baitfinder", id);
  tripLogsDb
    .findBaitByLogId(id)
    .then(bait => {
      if (bait) {
        res.status(200).json({ success: true, bait });
      } else {
        res.status(400).json({ success: false, message: "Log ID not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, message: "Server error", err });
    });
});

module.exports = router;
