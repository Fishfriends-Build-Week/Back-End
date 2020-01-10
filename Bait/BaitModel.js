const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findById,
  remove,
  update
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

function remove(bait_id) {
  return db("bait")
    .where("bait_id", bait_id)
    .del();
}

function update(bait_id, changes) {
  return db("bait")
    .where("bait_id", bait_id)
    .update(changes);
}
