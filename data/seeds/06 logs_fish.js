exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("logs_fish")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("logs_fish").insert([
        { log_id: 1, fish_id: 1 },
        { log_id: 1, fish_id: 2 },
        { log_id: 1, fish_id: 3 },
        { log_id: 2, fish_id: 1 },
        { log_id: 2, fish_id: 2 },
        { log_id: 2, fish_id: 3 },
        { log_id: 3, fish_id: 1 },
        { log_id: 3, fish_id: 2 },
        { log_id: 3, fish_id: 3 }
      ]);
    });
};
