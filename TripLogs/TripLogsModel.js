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
  return db("logs");
}

function findByLocation(location) {
  return db("logs").where(location);
}

function findById(id) {
  return db("logs")
    .where({ id })
    .first();
}
