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
    connection: process.env.PG_CONNECTION_STRING || 'postgres://efmfbmrwceargq:15cb3c5b1d0a7db7d078aa9e87a26ac7e0e9b5f740b55e223b0003effd6676b1@ec2-184-73-189-221.compute-1.amazonaws.com:5432/d2rpdh9kpdatq5?ssl=true',
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
