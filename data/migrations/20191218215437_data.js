exports.up = function(knex) {
  return knex.schema
    .createTable("accounts", tbl => {
      tbl.increments("account_id");
      tbl
        .string("username")
        .unique()
        .notNullable();
      tbl.string("password").notNullable();
    })

    .createTable("locations", tbl => {
      tbl.increments("location_id");

      tbl
        .string("location_name")
        .unique()
        .notNullable();
    })

    .createTable("bait", tbl => {
      tbl.increments("bait_id");
      tbl
        .string("bait_name")
        .unique()
        .notNullable();
    })

    .createTable("fish", tbl => {
      tbl.increments("fish_id");
      tbl
        .string("fish_name")
        .unique()
        .notNullable();
    })

    .createTable("logs", tbl => {
      tbl.increments("log_id");
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
      tbl
        .float("time_spent")
        .unsigned()
        .notNullable();
      tbl
        .integer("location_id")
        .notNullable()
        .references("locations.location_id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("account_id")
        .unsigned()
        .notNullable()
        .references("accounts.account_id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("logs_bait", tbl => {
      tbl
        .integer("log_id")
        .unsigned()
        .notNullable()
        .references("logs.log_id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl
        .integer("bait_id")
        .unsigned()
        .notNullable()
        .references("bait.bait_id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl
        .primary(["log_id", "bait_id"])

        .createTable("logs_fish", tbl => {
          tbl
            .integer("log_id")
            .unsigned()
            .notNullable()
            .references("logs.log_id")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");

          tbl
            .integer("fish_id")
            .unsigned()
            .notNullable()
            .references("fish.fish_id")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");

          tbl.primary(["log_id", "fish_id"]);
        });
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("logs_fish")
    .dropTableIfExists("logs_bait")
    .dropTableIfExists("logs")
    .dropTableIfExists("fish")
    .dropTableIfExists("bait")
    .dropTableIfExists("locations")
    .dropTableIfExists("accounts");
};
