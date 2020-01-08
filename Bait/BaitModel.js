const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findById
};

function add(newBait) {
  return db("bait")
    .insert(newBait)
    .then(ids => {
      return findById(ids[0]);
    });
}

function find() {
  return db("bait");
}

function findById(id) {
  return db("bait")
    .where("bait_id", id)
    .first();
}
