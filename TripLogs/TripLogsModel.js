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
  //   SELECT *
  // FROM logs
  // JOIN logs_bait ON logs_bait.log_id = logs.log_id
  // JOIN bait ON logs_bait.bait_id = bait.bait_id
  // ORDER BY logs.log_id

  return db("logs as l")
    .join("logs_bait as lb", "lb.log_id", "l.log_id")
    .join("bait as b", "lb.bait_id", "b.bait_id")
    .join("locations as loc", "l.location_id", "loc.location_id")
    .orderBy("l.log_id");

  // return db("logs_bait as lb")
  //   .join("logs as l, l.log_id, lb.log_id")
  //   .join("bait as b, b.bait_id, lb.bait_id")
  //   .orderBy("l.log_id, b.bait_id");
}

function findByLocation(location) {
  return db("logs").where("location_name", location);
}

function findById(log_id) {
  return db("logs")
    .where({ log_id })
    .first();
}
