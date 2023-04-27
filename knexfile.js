// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : 'test-db.ctfc5k8upep6.us-east-1.rds.amazonaws.com',
      port: 5432,
      user : 'postgres',
      password : 'sn1DSAVQf76UiPcH1vM0',
    }
  },

  staging: {
    client: 'pg',
    connection: {
      host : 'test-db.ctfc5k8upep6.us-east-1.rds.amazonaws.com',
      port: 5432,
      user : 'postgres',
      password : 'sn1DSAVQf76UiPcH1vM0',
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
    client: 'pg',
    connection: {
      host : 'test-db.ctfc5k8upep6.us-east-1.rds.amazonaws.com',
      port: 5432,
      user : 'postgres',
      password : 'sn1DSAVQf76UiPcH1vM0',
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
