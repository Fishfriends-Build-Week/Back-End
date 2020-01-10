const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findById
};

function add(newFish) {
  return db("fish")
    .insert(newFish)
    .then(ids => {
      return findById(ids[0]);
    });
}

function find() {
  return db("fish");
}

function findById(id) {
  return db("fish")
    .where("fish_id", id)
    .first();
}
