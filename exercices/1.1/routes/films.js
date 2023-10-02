var express = require('express');
var router = express.Router();

const MOVIES = [
  {
    id: 1,
    title: 'Percy Jackson',
    duration: '180 minutes',
    budget: '10 000',
    link: 'https://www.imdb.com/title/tt0814255/',
  },
  {
    id: 1,
    title: 'Harry Potter',
    duration: '195 minutes',
    budget: '20 000',
    link: 'https://www.imdb.com/title/tt0814255/',
  },
  {
    id: 1,
    title: 'The bridge of therabithia',
    duration: '160 minutes',
    budget: '9 000',
    link: 'https://www.imdb.com/title/tt0814255/',
  },
];

// Read all the pizzas from the menu
router.get('/', (req, res, next) => {
  console.log('GET /myMovies');
  res.json(MOVIES);
});

module.exports = router;