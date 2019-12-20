const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
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

function findBy(logName) {
  return db("logs").where(logName);
}

function findById(id) {
  return db("logs")
    .where({ id })
    .first();
}
