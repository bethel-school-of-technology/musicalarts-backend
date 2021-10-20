var express = require('express');
// const { ARRAY } = require('sequelize/types');
var router = express.Router();
const { Order, Product, ProductOrdered, ShippingInfo, PaymentMethod, Sequelize } = require('../models');
var auth = require('../services/auth');


/* POST create an order */

router.post('/checkout', async (req, res, next) => {

  const { userId, productsOrdered, totalPrice, shippingInfo, paymentMethod } = req.body;

  // var orderArrays = [productsOrdered, shippingInfo, paymentMethod];

  // Validate token / get the user
  // const user = req.user;

  // if (!user) {
  //   res.status(403).send();
  //   return;
  // }

  if (!productsOrdered || !Array.isArray(req.body.productsOrdered)) {
    res.status(400).send({ message: 'No Products Ordered' });
  }

  if (!totalPrice) {
    res.status(400).send({ message: 'Total Price not provided' });
  }

  let newOrders = [];
  let newProductsOrdered = [];
  let total = 0;

  productsOrdered.forEach(function (product) {

    Order.create({
      totalPrice: totalPrice,
      // userId: req.body.user.id
    }).then(newOrder => {
      // newOrders.push(newOrder);
      res.json(newOrder);
    }).catch(() => {
      res.status(400).send();
    });

    // To-Do: Make Sure Validation Occurs

    // Check if we have the quantity available

    ProductOrdered.create({
      productId: product.productId,
      productName: product.productName,
      quantity: product.quantity,
      price: product.price,
      // userId: req.body.user.id
    }).then(newProductOrdered => {
      // newProductsOrdered.push(newProductOrdered);
      res.json(newProductOrdered);
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
  // Need to calculate totalPrice somewhere

  const totalCost = productsOrdered.reduce((total, product) => {
    return total + product.price;
  }, 0);
  console.log("TOTAL: ", totalCost);

  // Create instance for ShippingInfo
  shippingInfo.map(function (shipping) {
    ShippingInfo.create({
      firstName: shipping.firstName,
      lastName: shipping.lastName,
      email: shipping.email,
      address: shipping.address,
      city: shipping.city,
      state: shipping.state,
      zipCode: shipping.zipCode,
    })
      .then((newShippingInfo) => {
        res.json(newShippingInfo);
      })
      .catch(() => {
        res.status(400).send();
      });
  });

  // Create instance for PaymentMethod
  paymentMethod.map(function (payment) {
    PaymentMethod.create({
      cardNumber: payment.cardNumber,
      expirationDate: payment.expirationDate,
      cvv: payment.cvv,
      phoneNumber: payment.phoneNumber,
    })
      .then((newPaymentMethod) => {
        res.json(newPaymentMethod);
      })
      .catch(() => {
        res.status(400).send();
      });
  });

});


/* GET all orders */
router.get('/', function (req, res, next) {
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