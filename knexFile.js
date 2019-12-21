// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/fishFriends.db3"
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        // enforces foreign key constraints on SQLite, not needed for other DBMS
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    }
  }
};
