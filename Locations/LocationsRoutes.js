const express = require("express");

const locationsDb = require("./LocationsModel.js");
const router = express.Router();

router.get("/", (req, res) => {
  locationsDb
    .find()
    .then(locations => {
      res.status(200).json({ success: true, locations });
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  locationsDb
    .findById(id)
    .then(location => {
      res.status(200).json({ success: true, location });
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.post("/", (req, res) => {
  const newLocation = req.body;

  locationsDb
    .add(newLocation)
    .then(location => {
      res.status(201).json({ success: true, location });
    })
    .catch(err => {
      res.status(501).json({ success: false, err });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  locationsDb
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
  locationsDb
    .update(id, changes)
    .then(updatedLocation => {
      res.status(202).json({ success: true, updatedLocation: updatedLocation });
    })
    .catch(err => {
      res.status(502).json({ success: false, message: err });
    });
});

module.exports = router;
