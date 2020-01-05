exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("locations")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("locations").insert([
        { location_id: 1, location_name: "Mt Rushmore" },
        { location_id: 2, location_name: "Mississippi River" },
        { location_id: 3, location_name: "Grand Rapids" }
      ]);
    });
};
