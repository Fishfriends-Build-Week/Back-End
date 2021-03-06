const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findByLocation,
  findById,
  remove,
  update,
  findFishByLogId,
  findBaitByLogId
};

async function add(log) {
  // const [log_id] = await db("logs").insert(log, "log_id");

  // // bait_list = log.bait_list;

  // // bait_list.forEach(item => {
  // //   //loop through added bait list and insert into bridge table
  // //   db("logs_bait").insert({
  // //     log_id: log_id,
  // //     bait_id: item.bait_id
  // //   });
  // // });

  // return db("accounts")
  //   .where({ log_id })
  //   .first();

  return db("logs")
  .insert(log, "log_id")
  .then((id) => {
    return findById(id);
  });
}

function find() {
  return db("logs as l")
    .join("locations as loc", "l.location_id", "loc.location_id")
    .join("accounts as a", "l.account_id", "a.account_id")
    .join("logs_bait as lb", "lb.log_id", "l.log_id")
    .join("bait as b", "lb.bait_id", "b.bait_id")
    .orderBy("l.log_id");
}

function findByLocation(location) {
  // console.log(`TripLogsModel: findByLocation -> location`, `'%${location}%'`);

  const r = db("logs as l")
    .join("locations as loc", "l.location_id", "loc.location_id")
    .where("loc.location_name", "like", `%${location}%`);

  // console.log(`TripLogsModel: findByLocation -> result`, r);

  return r;
}

function findById(log_id) {
  return db("logs")
    .where("log_id", log_id)
    .first();
}

function remove(log_id) {
  return db("logs")
    .where("log_id", log_id)
    .del();
}

function update(log_id, changes) {
  return db("logs")
    .where("log_id", log_id)
    .update(changes);
}

function findFishByLogId(logId) {
  console.log("logId from finding fish", logId);

  //   SELECT f.fish_id, f.fish_name
  // FROM fish as f
  // INNER JOIN logs_fish as lf on f.fish_id = lf.fish_id
  // INNER JOIN logs as l on l.log_id = lf.log_id
  // WHERE l.log_id = 1

  return db("fish as f")
    .join("logs_fish as lf", "lf.fish_id", "f.fish_id")
    .join("logs as l", "l.log_id", "lf.log_id")
    .select("f.fish_id", "f.fish_name")
    .where("l.log_id", logId);
}

function findBaitByLogId(logId) {
  console.log("logId from finding bait", logId);

  //   SELECT f.fish_id, f.fish_name
  // FROM fish as f
  // INNER JOIN logs_fish as lf on f.fish_id = lf.fish_id
  // INNER JOIN logs as l on l.log_id = lf.log_id
  // WHERE l.log_id = 1

  return db("bait as b")
    .join("logs_bait as lb", "lb.bait_id", "b.bait_id")
    .join("logs as l", "l.log_id", "lb.log_id")
    .select("b.bait_id", "b.bait_name")
    .where("l.log_id", logId);
}
