var express = require('express');
var router = express.Router();
const { Order } = require('../models');
var auth = require('../services/auth');

/* GET all orders */
router.get('/', function(req, res, next) {
  Order.findAll().then(ordersList => {
    res.json(ordersList);
  })
});

/* GET /:id get an individual order */
router.get('/:id', (req, res, next) => {
  const orderId = parseInt(req.params.id);

  Order.findOne({
    where: {
      id: orderId
    }
  }).then(theOrder => {
    if (theOrder) {
      res.json(theOrder);
    } else {
      res.status(404).send();
    }
  }, err => {
    res.status(500).send(err);
  })
});

/* POST create an order */
router.post('/', async (req, res, next) => {

  // Validate token / get the user
  const user = req.user;

  if (!user) {
    res.status(403).send();
    return;
  }

  // Create the item with the user id
  Order.create({
    itemsOrdered: req.body.itemsOrdered,
    totalPrice: req.body.totalPrice,
    purchaseDate: req.body.purchaseDate,
    UserId: user.id
  }).then(newOrder => {
    res.json(newOrder);
  }).catch(() => {
    res.status(400).send();
  });
});

/* PUT update an order */
router.put('/:id', ( req, res, next ) => {
  const orderId = parseInt(req.params.id);

  if (!orderId || orderId <= 0) {
    res.status(400).send('Invalid ID');
    return;
  }

  const user = req.user;

  if (!user) {
    res.status(403).send();
    return;
  }

  Order.update({
    itemsOrdered: req.body.itemsOrdered,
    totalPrice: req.body.totalPrice,
    purchaseDate: req.body.purchaseDate
  }, {
    where: {
      id: orderId
    }
  }).then(() => {
    res.status(204).send();
  }).catch(() => {
    res.status(400).send();
  })
});

/* DELETE an order */
router.delete('/:id', ( req, res, next ) => {
  const orderId = parseInt(req.params.id);

  if (!orderId || orderId <= 0) {
    res.status(400).send('Invalid ID');
    return;
  }

  const user = req.user;

  if (!user) {
    res.status(403).send();
    return;
  }  

  Order.destroy({
    where: {
      id: orderId
    }
  }).then(() => {
    res.status(204).send();
  }).catch(() => {
    res.status(400).send();
  })
});


module.exports = router;