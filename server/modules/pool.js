const pg = require('pg');

const Pool = pg.Pool; // Class

// Connect Node to our database
const pool = new Pool({
  database: 'jazzy_ajax', // name of our database
  host: 'localhost', // where is your database?
  port: 5432, // this is the default port
  max: 10, // number of connections
  idleTimeoutMillis: 10000, // 10 seconds
});

module.exports = pool;
