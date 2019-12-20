const db = require("../data/dbConfig");

module.exports = {
  add,
  findBy,
  findById
};

async function add(log) {
  const [id] = await db("logs").insert(log, "id");

  return db("accounts")
    .where({ id })
    .first();
}

function findBy(logName) {
  return db("logs").where(logName);
}

function findById(id) {
  return db("logs")
    .where({ id })
    .first();
}
