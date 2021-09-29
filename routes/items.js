var express = require('express');
var router = express.Router();
const { Item } = require('../models');
var auth = require('../services/auth');

/* GET all items */
router.get('/', function(req, res, next) {
  Item.findAll().then(itemList => {
    res.json(itemList);
  })
});

/* GET /:id get an individual item */
router.get('/:id', (req, res, next) => {
  const itemId = parseInt(req.params.id);

  Item.findOne({
    where: {
      id: itemId
    }
  }).then(theItem => {
    if (theItem) {
      res.json(theItem);
    } else {
      res.status(404).send();
    }
  }, err => {
    res.status(500).send(err);
  })
});

/* POST create an item */
router.post('/', async (req, res, next) => {
  // Get the token from the request
  // const header = req.headers.authorization;

  // if (!header) {
  //   res.status(403).send();
  //   return;
  // }

  // const token = header.split(' ')[1];

  // Validate token / get the user
  const user = req.user;

  if (!user) {
    res.status(403).send();
    return;
  }
  // Create the item with the user id
  Item.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    location: req.body.location,
    genre: req.body.genre,
    musicType: req.body.musicType,
    artType: req.body.artType,
    imageUrl: req.body.imageUrl,
    UserId: user.id
  }).then(newItem => {
    res.json(newItem);
  }).catch(() => {
    res.status(400).send();
  });
});

/* PUT update a item */
router.put('/:id', ( req, res, next ) => {
  const itemId = parseInt(req.params.id);

  if (!itemId || itemId <= 0) {
    res.status(400).send('Invalid ID');
    return;
  }

  const user = req.user;

  if (!user) {
    res.status(403).send();
    return;
  }

  Item.update({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    location: req.body.location,
    genre: req.body.genre,
    musicType: req.body.musicType,
    artType: req.body.artType,
    imageUrl: req.body.imageUrl
  }, {
    where: {
      id: itemId
    }
  }).then(() => {
    res.status(204).send();
  }).catch(() => {
    res.status(400).send();
  })
});

/* DELETE an item */
router.delete('/:id', ( req, res, next ) => {
  const itemId = parseInt(req.params.id);

  if (!itemId || itemId <= 0) {
    res.status(400).send('Invalid ID');
    return;
  }

  const user = req.user;

  if (!user) {
    res.status(403).send();
    return;
  }  


  Item.destroy({
    where: {
      id: itemId
    }
  }).then(() => {
    res.status(204).send();
  }).catch(() => {
    res.status(400).send();
  })
});


module.exports = router;
