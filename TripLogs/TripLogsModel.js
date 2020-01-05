const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findByLocation,
  findById
};

async function add(log) {
  const [log_id] = await db("logs").insert(log, "log_id");

  return db("accounts")
    .where({ log_id })
    .first();
}

function find() {
  return db("logs_bait as lb")
    .join("logs as l, l.log_id, lb.log_id")
    .join("bait as b, b.bait_id, lb.bait_id")
    .orderBy("l.log_id, b.bait_id");
}

function findByLocation(location) {
  return db("logs").where(location);
}

function findById(log_id) {
  return db("logs")
    .where({ log_id })
    .first();
}
