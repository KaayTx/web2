var express = require('express');
var router = express.Router();

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
router.get('/', (req, res, next) => {
  const minDuration = req?.query?.['minimum-duration'] ? Number(req.query['minimum-duration']) : undefined;
  if(minDuration === undefined) return res.json(MOVIES); //si on trouve pas, alors on renvoie tous les films qu'on a 

  if(typeof minDuration !== 'number' || minDuration <= 0) return res.sendStatus(400);

  const filmsReachingMinDuration = MOVIES.filter((film) => film.duration >= minDuration);

  console.log('MinDuration : ' , minDuration);
  console.log('filmsReachingMinDuration : ' , filmsReachingMinDuration);
  return res.json(filmsReachingMinDuration);
});


// Get id
router.get('/:id', (req, res, next) => {
  const movieId = MOVIES.findIndex((film) => film.id == req.params.id);
  if(movieId < 0) return res.sendStatus(404);
  console.log('id : ' , movieId);
  console.log('Movie found by id : ', MOVIES[movieId]);
  return res.json(MOVIES[movieId]);
});



//Create film
router.post('/', (req, res, next) => {
  const title = 
    req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
  
    const link =
    req?.body?.content?.trim().length !== 0 ? req.body.link : undefined;

  const duration = 
    typeof req?.body?.duration !== 'number' || req.body.duration < 0 ? undefined : req.body.duration;
  
  const budget = 
    typeof req?.body?.budget !== 'number' || req.body.budget < 0 ? undefined : req.body.budget;


  if(!title || !link || !duration || !budget) return res.sendStatus(409);

  const lastIdIndex = MOVIES?.length !== 0 ? MOVIES.length - 1 : undefined; 
  const lastId = lastIdIndex !== undefined ? MOVIES[lastIdIndex]?.id : 0;
  const nextId = lastId + 1;
  console.log(nextId);


  const newFilm = { id: nextId, title, link, duration, budget };
  console.log(newFilm);

  MOVIES.push(newFilm);
  
  return res.json(newFilm);
});


//Delete a movie
router.delete('/:id', (req, res, next) => {
  const movieId = MOVIES.findIndex((film) => film.id == req.params.id);
  if(movieId < 0) return res.sendStatus(404);

  const itemsRemoved = MOVIES.splice(movieId, 1);
  const movieRemoved = itemsRemoved[0];

  return res.json(movieRemoved);
});


//Patch a movie
router.patch('/:id', function (req, res) {
  const title = req?.body?.title;
  const link =  req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  if(
    !req.body || 
    (title !== undefined && !title.trim()) || 
    (link !== undefined && !link.trim()) || 
    (duration !== undefined && (typeof req?.body?.duration !== 'number' || duration < 0)) || 
    (budget !== undefined && (typeof req?.body?.budget !== 'number' || budget < 0)))
  return res.sendStatus(400);

  const movieId = MOVIES.findIndex((film) => film.id == req.params.id);
  if(movieId < 0) return res.sendStatus(404);

  const movieUpdated = {...MOVIES[movieId], ...req.body};
  MOVIES[movieId] = movieUpdated;

  return res.json(movieUpdated);
});


//put a movie
router.put('/:id', (req, res, next) => {
  const title = req?.body?.title;
  const link =  req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  if(!req.body || !title || !title.trim() || !link || !link.trim() 
  || duration === undefined || typeof req?.body?.duration !== 'number' || duration < 0
  || budget === undefined || typeof req?.body?.budget !== 'number' || budget < 0)
  return res.sendStatus(400);

  const id = req.params.id;
  const movieId = MOVIES.findIndex((film) => film.id == id);
  if(movieId < 0){
    const newMovie = { id, title, link, duration, budget};
    MOVIES.push(newMovie);
    return res.json(newMovie);
  } 

  const movietoUpdate = MOVIES[movieId];
  const movieUpdated = {...movietoUpdate,...req.body};
  MOVIES[movieId] = movieUpdated;


  return res.json(movieUpdated);
});

module.exports = router;