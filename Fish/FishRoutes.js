const express = require("express");

const fishDb = require("./FishModel.js");
const router = express.Router();

router.get("/", (req, res) => {
  fishDb
    .find()
    .then(fish => {
      res.status(200).json({ success: true, fish });
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  fishDb
    .findById(id)
    .then(fish => {
      res.status(200).json({ success: true, fish });
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.post("/", (req, res) => {
  const newFish = req.body;

  fishDb
    .add(newFish)
    .then(fish => {
      res.status(201).json({ success: true, fish });
    })
    .catch(err => {
      res.status(501).json({ success: false, err });
    });
});

module.exports = router;
