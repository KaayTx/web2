const express = require('express');
const {readAllMovies, readOneMovie, createOneMovie, deleteOneMovie, updateOneFilm, updateOrCreateOneFilm} = require('../models/films');

const router = express.Router();


// Filtered by minimum-duration
router.get('/', (req, res) => {
 const filmsPossiblyFiltered = readAllMovies(req?.query?.['minimum-duration']);

 if(filmsPossiblyFiltered === undefined) return res.sendStatus(400);
 return res.json(filmsPossiblyFiltered);
});

// Get id
router.get('/:id', (req, res) => {

  const foundMovie = readOneMovie(req?.params?.id);
  if (!foundMovie) return res.sendStatus(404);

  return res.json(foundMovie);
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

  const newFilm = createOneMovie(title, link, duration, budget);

  return res.json(newFilm);
});

// Delete a movie
router.delete('/:id', (req, res) => {

  const movieRemoved = deleteOneMovie(req?.params?.id);
  if (!movieRemoved) return res.sendStatus(404);

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

  const movieUpdated = updateOneFilm(req?.params?.id, req?.body);

  if(!movieUpdated) return res.sendStatus(404);

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

  const updatedOrNewFilm = updateOrCreateOneFilm(req?.params?.id, req?.body);

  return res.json(updatedOrNewFilm);
});

module.exports = router;
