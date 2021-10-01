var express = require('express');
var router = express.Router();
const { Inventory } = require('../models');
var auth = require('../services/auth');

/* GET all items in inventory */
router.get('/', function(req, res, next) {
  Inventory.findAll().then(inventoryList => {
    res.json(inventoryList);
  })
});

/* GET /:id get an individual item */
router.get('/:id', (req, res, next) => {
  const inventoryId = parseInt(req.params.id);

  Inventory.findOne({
    where: {
      id: inventoryId
    }
  }).then(theInventory => {
    if (theInventory) {
      res.json(theInventory);
    } else {
      res.status(404).send();
    }
  }, err => {
    res.status(500).send(err);
  })
});

/* POST create an item */
router.post('/', async (req, res, next) => {

  // Validate token / get the user
  const user = req.user;

  if (!user) {
    res.status(403).send();
    return;
  }
  // Create the item with the user id
  Inventory.create({
    itemName: req.body.itemName,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price,
    location: req.body.location,
    genre: req.body.genre,
    category: req.body.category,
    imageUrl: req.body.imageUrl,
    UserId: user.id
  }).then(newInventory => {
    res.json(newInventory);
  }).catch(() => {
    res.status(400).send();
  });
});

/* PUT update a item */
router.put('/:id', ( req, res, next ) => {
  const inventoryId = parseInt(req.params.id);

  if (!inventoryId || inventoryId <= 0) {
    res.status(400).send('Invalid ID');
    return;
  }

  const user = req.user;

  if (!user) {
    res.status(403).send();
    return;
  }

  Inventory.update({
    itemName: req.body.itemName,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price,
    location: req.body.location,
    genre: req.body.genre,
    category: req.body.category,
    imageUrl: req.body.imageUrl
  }, {
    where: {
      id: inventoryId
    }
  }).then(() => {
    res.status(204).send();
  }).catch(() => {
    res.status(400).send();
  })
});

/* DELETE an item */
router.delete('/:id', ( req, res, next ) => {
  const inventoryId = parseInt(req.params.id);

  if (!inventoryId || inventoryId <= 0) {
    res.status(400).send('Invalid ID');
    return;
  }

  const user = req.user;

  if (!user) {
    res.status(403).send();
    return;
  }  


  Inventory.destroy({
    where: {
      id: inventoryId
    }
  }).then(() => {
    res.status(204).send();
  }).catch(() => {
    res.status(400).send();
  })
});


module.exports = router;
