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

// SELECT f.fish_id, f.fish_name
// FROM fish as f
// INNER JOIN logs_fish as lf on f.fish_id = lf.fish_id
// INNER JOIN logs as l on l.log_id = lf.log_id
// WHERE l.log_id = 1
