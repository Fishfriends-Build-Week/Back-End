exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("fish")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("fish").insert([
        { fish_id: 1, fish_name: "Tuna" },
        { fish_id: 2, fish_name: "Salmon" },
        { fish_id: 3, fish_name: "Swordfish" }
      ]);
    });
};
