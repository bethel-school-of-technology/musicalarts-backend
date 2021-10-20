var express = require('express');
// const { ARRAY } = require('sequelize/types');
var router = express.Router();
const { Order, Product, ProductOrdered, Sequelize } = require('../models');
var auth = require('../services/auth');


/* POST create an order */

router.post('/checkout', async (req, res, next) => {

  const {
    userId,
    productsOrdered,
    totalPrice,
    buyerFirstName,
    buyerLastName,
    buyerEmail,
    buyerPhoneNumber,
    streetAddress,
    city,
    state,
    zipcode,
    nameOnCard,
    cardNumber,
    cardExpirationDate,
    cardCvv } = req.body;

  // Validate token / get the user
  const user = req.user;

  if (!user) {
    res.status(403).send();
    return;
  }
  if (!productsOrdered || !Array.isArray(req.body.productsOrdered)) {
    res.status(400).send({ message: 'No Products Ordered' });
  }
  if (!totalPrice) {
    res.status(400).send({ message: 'Total Price not provided' });
  }
  let newOrders = [];
  let newProductsOrdered = [];
  let total = 0;
  // To-Do: Make Sure Validation Occurs?‹‹
  // Need to Check if we have the quantity available?
  Order.create({
    totalPrice: totalPrice,
    buyerFirstName: buyerFirstName,
    buyerLastName: buyerLastName,
    buyerEmail: buyerEmail,
    buyerPhoneNumber: buyerPhoneNumber,
    streetAddress: streetAddress,
    city: city,
    state: state,
    zipcode: zipcode,
    nameOnCard: nameOnCard,
    cardNumber: cardNumber,
    cardExpirationDate: cardExpirationDate,
    cardCvv: cardCvv,
    UserId: user.id
  }).then(newOrder => {

    productsOrdered.forEach(function (product) {

      ProductOrdered.create({
        productId: product.productId,
        productName: product.productName,
        quantity: product.quantity,
        price: product.price,
        OrderId: newOrder.id
      }).then(newProductOrdered => {
        // newProductsOrdered.push(newProductOrdered);
        // res.json(newProductOrdered);
      }).catch(() => {
        res.status(400).send();
      });

      // Update Product quantity
      Product.update({
        quantity: Sequelize.literal(`quantity - ${product.quantity}`)
      }, {
        where: { id: product.productId }
      });


    });
    // newOrders.push(newOrder);
    res.json(newOrder);
  }).catch(() => {
    res.status(400).send();
  });

  // Need to calculate totalPrice somewhere
  const totalCost = productsOrdered.reduce((total, product) => {
    return total + product.price;
  }, 0);
  console.log("TOTAL: ", totalCost);
});

/* GET all orders */
router.get('/', function (req, res, next) {
  Order.findAll({
    include: [ProductOrdered, {
      model: ProductOrdered,
      include: [Product]
    }]
  }).then(ordersList => {
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

/* PUT update an order */
router.put('/:id', (req, res, next) => {
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
    // productsOrdered: req.body.productsOrdered,
    totalPrice: req.body.totalPrice
    // purchaseDate: req.body.purchaseDate
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
router.delete('/:id', (req, res, next) => {
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