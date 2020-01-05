exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("bait")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("bait").insert([
        { bait_id: 1, bait_name: "red worms" },
        { bait_id: 2, bait_name: "squid" },
        { bait_id: 3, bait_name: "blue whistler" }
      ]);
    });
};
