exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("accounts")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("accounts").insert([
        { id: 1, username: "user1", password: "pass1" },
        { id: 2, username: "user2", password: "pass2" },
        { id: 3, username: "user3", password: "pass3" }
      ]);
    });
};
