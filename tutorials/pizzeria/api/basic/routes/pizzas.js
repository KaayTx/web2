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


// Delete a pizza from the menu based on its id
router.delete('/:id', (req, res) => {
  /* :id -> paramètre de route qui prendre l'id de la ressource à modifier
  (ce que rentre le client dans l'url de la requete)
  */
  console.log(`DELETE /pizzas/${req.params.id}`);

  const foundIndex = MENU.findIndex(pizza => pizza.id == req.params.id);
/*Là on va récupérer l'element qu'on veut effacer */
  if (foundIndex < 0) return res.sendStatus(404);
/*Si on trouve pas d'élement dans le menu avec l'id passé en paramètre, on renvoie une erreur  */
  
const itemsRemovedFromMenu = MENU.splice(foundIndex, 1);
  /*splice -> efface les elemnts à partir de l'index trouvé
  1 -> pour lui demander d'effacer un seul element 
  splice renvoie un tableau avec tous les elements supprimés meme si on enleve qu'un seul element*/

  const itemRemoved = itemsRemovedFromMenu[0];
/*On récupère le premier element supprimé du tableau qui contient tous les elements supprimés */
//normalement le tableau doit tjrs contenir un seul element car l'id est unique  
res.json(itemRemoved);
});


// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  //là on indique la méthode patch pour dire qu'on veut modifier
  // :id -> on récupère le paramètre de route càd l'id rentré par le client dans l'url
  console.log(`PATCH /pizzas/${req.params.id}`);

  const title = req?.body?.title;
  const content = req?.body?.content;

  console.log('POST /pizzas');

  if ((!title && !content) || title?.length === 0 || content?.length === 0) return res.sendStatus(400);
// On renvoie un BadRequest si on a reçu ni un titre ni un contenu

//On continue si on reçoit un des deux
  const foundIndex = MENU.findIndex(pizza => pizza.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedPizza = {...MENU[foundIndex], ...req.body};
/*si on trouve la ressource(id entré par client) -> alors 
...MENU[foundIndex] ->on va créer un objet qui contient toutes les propriétés de l'objet trouvé
MENU[foundIndex] -> pour accéder à l'objet via son indice dans l'array du MENU
... -> on copie toutes les propriétés de cet objet
...req.body -> on vient écraser toutes les propriétés mises dans le body de la requete
ici le body c'est ce qu'il y'a dans pizzas.http et donc le title
*/

  MENU[foundIndex] = updatedPizza;
  //On met à jour le tableau en indiquant la pizza à jour dans l'index où on veut modifier

  res.json(updatedPizza);
})

module.exports = router;