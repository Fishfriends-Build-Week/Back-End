exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("bait")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("bait").insert([
        { id: 1, bait_name: "red worms" },
        { id: 2, bait_name: "squid" },
        { id: 3, bait_name: "blue whistler" }
      ]);
    });
};
