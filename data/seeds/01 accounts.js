exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("accounts")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("accounts").insert([
        { account_id: 1, username: "user1", password: "pass1" },
        { account_id: 2, username: "user2", password: "pass2" },
        { account_id: 3, username: "user3", password: "pass3" }
      ]);
    });
};
