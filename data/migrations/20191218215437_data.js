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

    .createTable("logs", tbl => {
      tbl.increments("log_id");
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
      tbl
        .float("time_spent")
        .unsigned()
        .notNullable();
      tbl.string("location").notNullable();
      tbl
        .integer("accounts_id")
        .unsigned()
        .notNullable()
        .references("accounts.account_id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("bait", tbl => {
      tbl.increments("bait_id");
      tbl
        .string("bait_name")
        .unique()
        .notNullable();
    })

    .createTable("logs_bait", tbl => {
      tbl
        .integer("logs_id")
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

      tbl.primary(["logs_id", "bait_id"]);
    })

    .createTable("locations", tbl => {
      tbl.increments("location_id");

      tbl
        .string("location_name")
        .unique()
        .notNullable();
    })

    .createTable("logs_locations", tbl => {
      tbl
        .integer("logs_id")
        .unsigned()
        .notNullable()
        .references("logs.log_id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl
        .integer("location_id")
        .unsigned()
        .notNullable()
        .references("locations.location_id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl.primary(["logs_id", "location_id"]);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("logs_locations")
    .dropTableIfExists("locations")
    .dropTableIfExists("logs_bait")
    .dropTableIfExists("bait")
    .dropTableIfExists("logs")
    .dropTableIfExists("accounts");
};
