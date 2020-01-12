exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("logs_bait")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("logs_bait").insert([
        { log_id: 1, bait_id: 1 },
        { log_id: 1, bait_id: 2 },
        { log_id: 1, bait_id: 3 },
        { log_id: 2, bait_id: 2 },
        { log_id: 2, bait_id: 3 },
        { log_id: 2, bait_id: 1 },
        { log_id: 3, bait_id: 3 },
        { log_id: 3, bait_id: 1 },
        { log_id: 3, bait_id: 2 }
      ]);
    });
};
