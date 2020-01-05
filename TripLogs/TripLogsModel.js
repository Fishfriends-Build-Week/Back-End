const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findByLocation,
  findById
};

async function add(log) {
  const [id] = await db("logs").insert(log, "id");

  return db("accounts")
    .where({ id })
    .first();
}

function find() {
  return db("logs_bait as lb")
    .join("logs as l, l.id, lb.logs_id")
    .join("bait as b, b.id, lb.bait_id")
    .orderBy("l.id, b.id");
}

function findByLocation(location) {
  return db("logs").where(location);
}

function findById(id) {
  return db("logs")
    .where({ id })
    .first();
}
