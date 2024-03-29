const express = require('express');
const path = require('node:path');
const { serialize, parse } = require('../utils/json');

const router = express.Router();


const jsonDbPath = path.join(__dirname, '/../data/films.json');

const MOVIES = [
  {
    id: 1,
    title: 'Percy Jackson',
    duration: 180,
    budget: '100',
    link: 'https://www.imdb.com/title/tt0814255/',
  },
  {
    id: 2,
    title: 'Harry Potter',
    duration: 650,
    budget: 200,
    link: 'https://www.imdb.com/title/tt0814255/',
  },
  {
    id: 3,
    title: 'The bridge of therabithia',
    duration: 160,
    budget: 60,
    link: 'https://www.imdb.com/title/tt0814255/',
  },
];

// Filtered by minimum-duration
router.get('/', (req, res) => {
  // Avant y'avait ça et ça marchait pas
 // const minDuration = req?.query?.['minimum-duration']
//  ? Number(req.query['minimum-duration']) : undefined;
// Faut mettre comme ça pour dire -> Read all the films, filtered by minimum-duration if the query param exists
const minDuration = req?.query ? Number(req.query['minimum-duration'])
  : undefined;

  if (typeof minDuration !== 'number' || minDuration <= 0) return res.sendStatus(400);

  const films = parse(jsonDbPath, MOVIES);

  if (!minDuration) return res.json(films); // si on trouve pas, alors on renvoie tous les films qu'on a

  const filmsReachingMinDuration = films.filter((film) => film.duration >= minDuration);

  return res.json(filmsReachingMinDuration);
});

// Get id
router.get('/:id', (req, res) => {
  const films = parse(jsonDbPath, MOVIES);

  const movieId = films.findIndex((film) => film.id === Number(req.params.id));
  if (movieId < 0) return res.sendStatus(404);

  return res.json(films[movieId]);
});

// Create film
router.post('/', (req, res) => {
  const title = req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;

  const link = req?.body?.content?.trim().length !== 0 ? req.body.link : undefined;

  const duration =
    typeof req?.body?.duration !== 'number' || req.body.duration < 0
      ? undefined
      : req.body.duration;

  const budget =
    typeof req?.body?.budget !== 'number' || req.body.budget < 0 ? undefined : req.body.budget;

  if (!title || !link || !duration || !budget) return res.sendStatus(400);

  const films = parse(jsonDbPath, MOVIES);

  const existingMovie = films.find((film) => film.title.toLowerCase() === title.toLowerCase());

  if (existingMovie) return res.sendStatus(409); // existe déjà

  const lastIdIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastIdIndex !== undefined ? films[lastIdIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = { id: nextId, title, link, duration, budget };

  films.push(newFilm);
  serialize(jsonDbPath, films);

  return res.json(newFilm);
});

// Delete a movie
router.delete('/:id', (req, res) => {
  const films = parse(jsonDbPath, MOVIES);

  const movieId = films.findIndex((film) => film.id === Number(req.params.id));
  if (movieId < 0) return res.sendStatus(404);

  const itemsRemoved = films.splice(movieId, 1);
  const movieRemoved = itemsRemoved[0];

  serialize(jsonDbPath, films);

  return res.json(movieRemoved);
});

// Patch a movie
router.patch('/:id', (req, res) => {
  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  if (
    !req.body ||
    (title !== undefined && !title.trim()) ||
    (link !== undefined && !link.trim()) ||
    (duration !== undefined && (typeof req?.body?.duration !== 'number' || duration < 0)) ||
    (budget !== undefined && (typeof req?.body?.budget !== 'number' || budget < 0))
  )
    return res.sendStatus(400);

  const films = parse(jsonDbPath, MOVIES);

  // eslint-disable-next-line eqeqeq
  const movieId = films.findIndex((film) => film.id === Number(req.params.id));
  if (movieId < 0) return res.sendStatus(404);

  const movieUpdated = { ...films[movieId], ...req.body };
  films[movieId] = movieUpdated;

  serialize(jsonDbPath, films);

  return res.json(movieUpdated);
});

// put a movie
router.put('/:id', (req, res) => {
  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  if (
    !req.body ||
    !title ||
    !title.trim() ||
    !link ||
    !link.trim() ||
    duration === undefined ||
    typeof req?.body?.duration !== 'number' ||
    duration < 0 ||
    budget === undefined ||
    typeof req?.body?.budget !== 'number' ||
    budget < 0
  )
    return res.sendStatus(400);

  const id = Number(req.params.id);
  const films = parse(jsonDbPath, MOVIES);

  const movieId = films.findIndex((film) => film.id === id);

  if (movieId < 0) {
    const newMovie = { id, title, link, duration, budget };
    films.push(newMovie);
    serialize(jsonDbPath, films);
    return res.json(newMovie);
  }

  const movietoUpdate = films[movieId];
  const movieUpdated = { ...movietoUpdate, ...req.body };
  films[movieId] = movieUpdated;

  serialize(jsonDbPath, films);

  return res.json(movieUpdated);
});

module.exports = router;
