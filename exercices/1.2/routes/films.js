var express = require('express');
var router = express.Router();

const MOVIES = [
  {
    id: 1,
    title: 'Percy Jackson',
    duration: 180,
    budget: '10 000',
    link: 'https://www.imdb.com/title/tt0814255/',
  },
  {
    id: 1,
    title: 'Harry Potter',
    duration: 195,
    budget: '20 000',
    link: 'https://www.imdb.com/title/tt0814255/',
  },
  {
    id: 1,
    title: 'The bridge of therabithia',
    duration: 160,
    budget: '9 000',
    link: 'https://www.imdb.com/title/tt0814255/',
  },
];

// Read all the films
router.get('/', (req, res, next) => {
  return res.json(MOVIES);
});

module.exports = router;