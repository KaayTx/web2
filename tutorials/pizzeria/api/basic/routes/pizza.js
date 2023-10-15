var express = require('express');
var router = express.Router();

const MENU = [
  {
    id: 1,
    title: '4 fromages',
    content: 'Gruyère, Sérac, Appenzel, Gorgonzola, Tomates',
  },
  {
    id: 2,
    title: 'Vegan',
    content: 'Tomates, Courgettes, Oignons, Aubergines, Poivrons',
  },
  {
    id: 3,
    title: 'Vegetarian',
    content: 'Mozarella, Tomates, Oignons, Poivrons, Champignons, Olives',
  },
  {
    id: 4,
    title: 'Alpage',
    content: 'Gruyère, Mozarella, Lardons, Tomates',
  },
  {
    id: 5,
    title: 'Diable',
    content: 'Tomates, Mozarella, Chorizo piquant, Jalapenos',
  },
];
/*
// Read all the pizzas from the menu
router.get('/', (req, res, next) => {
  console.log('GET /pizzas');
  res.json(MENU);
});
*/

/* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get('/', (req, res, next) => {
  const orderByTitle =
    req?.query?.order?.includes('title')
    /* req?.query?.order? -> on vérifie si y'a un paramètre de requete order, et si y'en a un
    .includes('title') -> on vérifie si la valeur contient title, si oui
    ? req.query.order -> on récupère cette valeur, sinon
    : undefined -> on renvoie undefined pour dire que cette valeur n'est pas définie
    */
      ? req.query.order
      : undefined;
  let orderedMenu;
  console.log(`order by ${orderByTitle ?? 'not requested'}`);
  /* là c'est un template string, on cherche la valeur de orderByTitle
  Le ?? nous permet de prendre la valeur de orderByTitle si elle n'est pas nullish
  Sinon (si elle est null ou undefined) on renvoie 'not found'
  */
  if (orderByTitle)
    orderedMenu = [...MENU].sort((a, b) => a.title.localeCompare(b.title));
  if (orderByTitle === '-title') orderedMenu = orderedMenu.reverse();

  console.log('GET /pizzas');
  res.json(orderedMenu ?? MENU);
  /* Y'a moyen qu'on rentre pas dans le if(orderByTitle), dans ce cas
  on aura odreredMenu qui est undefined car on lui donne une valeur dans le if
  Si c'est le cas (qu'il est nullish) alors on renvoie le menu de base
   */
});


// Read the pizza identified by an id in the menu
router.get('/:id', (req, res) => {
  console.log(`GET /pizzas/${req.params.id}`);

  const indexOfPizzaFound = MENU.findIndex((pizza) => pizza.id == req.params.id);

  if (indexOfPizzaFound < 0) return res.sendStatus(404);

  res.json(MENU[indexOfPizzaFound]);
});

// Create a pizza to be added to the menu.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;
/*Là on vérifie si on a reçu des chaines vides, si oui alors on renvoie dans les 2 cas
(ici et dans le if juste en dessous), une erreur pour dire au client qu'il a 
fait une mauvaise requete
*/

  console.log('POST /pizzas');

  if (!title || !content) return res.sendStatus(400); // error code '400 Bad request'

  const lastItemIndex = MENU?.length !== 0 ? MENU.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? MENU[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newPizza = {
    id: nextId,
    title: title,
    content: content,
  };

  MENU.push(newPizza);

  res.json(newPizza);
});


module.exports = router;