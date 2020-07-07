const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  console.log(`In /songs GET`);

  let queryText = `SELECT * FROM "songs" ORDER BY "title" ASC;`;
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
  const queryText = `INSERT INTO "songs" ("title", "length", "date_released", "extra_column")
        VALUES($1, $2, $3, $4);`;
  pool
    .query(queryText, [
      req.body.title,
      req.body.length,
      req.body.date_released,
      req.body.extra_column,
    ])
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
