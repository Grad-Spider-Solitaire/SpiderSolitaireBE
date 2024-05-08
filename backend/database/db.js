const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_URL,
  port: process.env.SERVER_PORT,
  database: process.env.DB_NAME,
  ssl: true,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
