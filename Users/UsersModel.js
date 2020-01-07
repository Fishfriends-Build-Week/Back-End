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
    .then(([id]) => {
      return findById(id);
    });
}

function find() {
  return db("accounts");
}

function findBy(user) {
  return db("accounts").where(user);
}
function findById(account_id) {
  return db("accounts")
    .where("account_id", account_id)
    .first()
    .then(user => {
      return user;
    });
}
