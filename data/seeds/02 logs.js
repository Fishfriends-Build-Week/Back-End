exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("logs")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("logs").insert([
        {
          id: 1,
          created_at: knex.fn.now(),
          time_spent: 0.5,
          location: "Big Bear",
          bait_id: 1,
          accounts_id: 1
        },
        {
          id: 2,
          created_at: knex.fn.now(),
          time_spent: 4.7,
          location: "Lake Mammoth",
          bait_id: 3,
          accounts_id: 1
        },
        {
          id: 3,
          created_at: knex.fn.now(),
          time_spent: 1,
          location: "The Great Lake",
          bait_id: 2,
          accounts_id: 1
        }
      ]);
    });
};
