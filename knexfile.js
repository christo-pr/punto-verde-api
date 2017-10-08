// Update with your config settings.

module.exports = {

  development: {
    // client: 'sqlite3',
    // connection: {
    //   filename: './dev.sqlite3'
    // }
    client: 'postgresql',
    // connection: {
    //   database: process.env.,
    //   user:     'username',
    //   password: 'password'
    // },
    connection: process.env.PG_CONNECTION_STRING || 'postgres://cpmoymya:5J_0ECi3zCqdEtsiE8lMHIVepBwV_NUp@elmer.db.elephantsql.com:5432/cpmoymya',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
