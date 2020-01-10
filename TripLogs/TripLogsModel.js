const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findByLocation,
  findById
};

async function add(log) {
  const [log_id] = await db("logs").insert(log, "log_id");

  bait_list = log.bait_list;

  bait_list.forEach(item => {
    //loop through added bait list and insert into bridge table
    db("logs_bait").insert({
      log_id: log_id,
      bait_id: item.bait_id
    });
  });

  return db("accounts")
    .where({ log_id })
    .first();
}

function find() {
  return db("logs as l")
    .join("logs_bait as lb", "lb.log_id", "l.log_id")
    .join("bait as b", "lb.bait_id", "b.bait_id")
    .join("locations as loc", "l.location_id", "loc.location_id")
    .orderBy("l.log_id");
}

function findByLocation(location) {
  return db("logs").where("location_name", location);
}

function findById(log_id) {
  return db("logs")
    .where({ log_id })
    .first();
}
