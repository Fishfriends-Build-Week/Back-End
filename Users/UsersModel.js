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
};

function find() {
  return db("accounts");
};

function findBy(username) {
  console.log(`UsersModel: findBy -> username =`, username);
  if (username !== "") {
    const u = db("accounts").where("username", username);
    // console.log(`UsersModel: findBy -> return\n`, u);
    return u;
  };
};
function findById(account_id) {
  return db("accounts")
    .where("account_id", account_id)
    .first()
    .then(user => {
      return user;
    });
};

function remove(account_id) {
  return db("accounts")
    .where("account_id", account_id)
    .del();
};

function update(account_id, changes) {
  return db("accounts")
    .where("account_id", account_id)
    .update(changes);
};
