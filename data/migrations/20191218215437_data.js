exports.up = function(knex) {
  return knex.schema
    .createTable("accounts", tbl => {
      tbl.increments();
      tbl
        .string("username")
        .unique()
        .notNullable();
      tbl.string("password").notNullable();
    })

    .createTable("logs", tbl => {
      tbl.increments();
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
      tbl
        .float("time_spent")
        .unsigned()
        .notNullable();
      tbl.string("location").notNullable();
      tbl
        .integer("bait_id")
        .unsigned()
        .notNullable()
        .references("bait_id")
        .inTable("logs_bait")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("accounts_id")
        .unsigned()
        .notNullable()
        .references("accounts.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("bait", tbl => {
      tbl.increments();
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
        .references("logs.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl
        .integer("bait_id")
        .unsigned()
        .notNullable()
        .references("bait.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl.primary(["logs_id", "bait_id"]);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("logs_bait")
    .dropTableIfExists("bait")
    .dropTableIfExists("logs")
    .dropTableIfExists("accounts");
};
