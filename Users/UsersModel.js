const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update
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
  console.log(`UsersModel: findBy -> user`, user);
  if (user !== "") {
    return db("accounts").where("username", user)
      .first()
      .then(innerUser => {
        console.log(`UsersModel: findBy => user -> user`, innerUser);
        return innerUser;
      });
  };
}
function findById(account_id) {
  return db("accounts")
    .where("account_id", account_id)
    .first()
    .then(user => {
      return user;
    });
}

function remove(account_id) {
  return db("accounts")
    .where("account_id", account_id)
    .del();
}

function update(account_id, changes) {
  return db("accounts")
    .where("account_id", account_id)
    .update(changes);
}
