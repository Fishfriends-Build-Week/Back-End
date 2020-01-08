const express = require("express");

const baitDb = require("./BaitModel.js");
const router = express.Router();

router.get("/", (req, res) => {
  baitDb
    .find()
    .then(bait => {
      res.status(200).json({ success: true, bait });
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  baitDb
    .findById(id)
    .then(bait => {
      res.status(200).json({ success: true, bait });
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.post("/", (req, res) => {
  const newBait = req.body;

  baitDb
    .add(newBait)
    .then(bait => {
      res.status(201).json({ success: true, bait });
    })
    .catch(err => {
      res.status(501).json({ success: false, err });
    });
});

module.exports = router;
