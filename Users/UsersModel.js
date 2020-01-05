const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function add(user) {
  return db("accounts")
    .insert(user)
    .then(([account_id]) => this.get(account_id));
}

function find() {
  return db("accounts");
}

function findBy(user) {
  return db("accounts").where(user);
}

function findById(account_id) {
  return db("accounts")
    .where({ account_id })
    .first();
}
