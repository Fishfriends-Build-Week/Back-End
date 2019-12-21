exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("logs_bait")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("logs_bait").insert([
        { logs_id: 1, bait_id: 1 },
        { logs_id: 1, bait_id: 2 },
        { logs_id: 1, bait_id: 3 },
        { logs_id: 2, bait_id: 1 },
        { logs_id: 2, bait_id: 2 },
        { logs_id: 2, bait_id: 3 },
        { logs_id: 3, bait_id: 1 },
        { logs_id: 3, bait_id: 2 },
        { logs_id: 3, bait_id: 3 }
      ]);
    });
};
