const express = require('express');
const router = express.Router();
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

router.get('/', (req, res) => {
  console.log(`In /songs GET`);

  let queryText = `SELECT * FROM "songs";`;
  pool
    .query(queryText)
    .then((result) => {
      // send back our query results as an array of objects
      res.send(result.rows); // result.rows will always be an Array
    })
    .catch((error) => {
      console.log(`Error in GET /songs ${error}`);
      // 500 means "server error", generic but effective
      res.sendStatus(500);
    });
});

// static content. this will be replaced with a database table
const songListArray = [
  {
    title: 'Take Five',
    length: '2:55',
    date_released: '1959-09-29',
  },
  {
    title: 'So What',
    length: '9:22',
    date_released: '1959-08-17',
  },
];

router.post('/', (req, res) => {
  const queryText = `INSERT INTO "songs" ("title", "length", "date_released")
        VALUES($1, $2, $3);`;
  pool
    .query(queryText, [req.body.title, req.body.length, req.body.date_released])
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
