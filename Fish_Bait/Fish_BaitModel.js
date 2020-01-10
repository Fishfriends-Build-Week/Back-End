const db = require("../data/dbConfig");

module.exports = {
  add
};

function add(newPair) {
  return db("fish_bait")
    .insert(newPair)
    .then(ids => {
      return;
    });
}
