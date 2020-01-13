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
      res.status(500).json({ success: false, err });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  fishDb
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
  fishDb
    .update(id, changes)
    .then(updatedFish => {
      res.status(202).json({ success: true, updatedFish: updatedFish });
    })
    .catch(err => {
      res.status(500).json({ success: false, message: err });
    });
});

module.exports = router;
