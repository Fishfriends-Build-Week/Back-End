const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findById,
  remove,
  update
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

function remove(fish_id) {
  return db("fish")
    .where("fish_id", fish_id)
    .del();
}

function update(fish_id, changes) {
  return db("fish")
    .where("fish_id", fish_id)
    .update(changes);
}

// SELECT f.fish_id, f.fish_name
// FROM fish as f
// INNER JOIN logs_fish as lf on f.fish_id = lf.fish_id
// INNER JOIN fish as l on l.fish_id = lf.fish_id
// WHERE l.fish_id = 1
