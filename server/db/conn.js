const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  //idleTimeoutMillis: 60000
});

module.exports = {
  pool,
  query: (text, params, callback) => pool.query(text, params, callback),
};
