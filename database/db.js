const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  host: process.env.RDS_HOSTNAME,
  port: process.env.RDS_PORT,
  database: process.env.RDS_DATABASE,
  ssl: true,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
