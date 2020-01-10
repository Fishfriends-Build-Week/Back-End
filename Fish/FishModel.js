const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findById,
  findByLogId
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

function findByLogId(logId) {
  return db("fish as f")
    .join("logs_fish as lf", "lf.fish_id", "f.fish_id")
    .join("logs as l", "l.log_id", "lf.log_id")
    .where("f.log_id", logId)
    .first();
}
