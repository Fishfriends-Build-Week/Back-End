const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findById,
  remove,
  update
};

function add(newLocation) {
  return db("locations")
    .insert(newLocation)
    .then(ids => {
      return findById(ids[0]);
    });
}

function find() {
  return db("locations");
}

function findById(id) {
  return db("locations")
    .where("location_id", id)
    .first();
}

function remove(location_id) {
  return db("locations")
    .where("location_id", location_id)
    .del();
}

function update(location_id, changes) {
  return db("locations")
    .where("location_id", location_id)
    .update(changes);
}
