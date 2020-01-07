exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("logs")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("logs").insert([
        {
          log_id: 1,
          created_at: knex.fn.now(),
          time_spent: 0.5,
          location_id: 2,
          account_id: 1
        },
        {
          log_id: 2,
          created_at: knex.fn.now(),
          time_spent: 4.7,
          location_id: 3,
          account_id: 1
        },
        {
          log_id: 3,
          created_at: knex.fn.now(),
          time_spent: 1,
          location_id: 1,
          account_id: 1
        }
      ]);
    });
};
