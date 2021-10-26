var express = require('express');
// const { ARRAY } = require('sequelize/types');
var router = express.Router();
const { Order, Product, ProductOrdered, Sequelize } = require('../models');
const Op = Sequelize.Op;
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

  let productIds = productsOrdered.map(a => a.productId);

  Product.findAll({
    where: {
      id: {
        [Op.in]: productIds
      }
    }
  }).then(function (result) {
    const productDbIds = result;
    let productCheck = productDbIds.map(b => b.id);
    console.log('Amount of items verified in DB: ' + productCheck.length);
    console.log('Amount of items ordered: ' + productIds.length);

    if (productIds.length !== productCheck.length) {
      res.status(400).send({ message: 'Something went wrong' });
    }
  });

  // Loop

  // count the products, check if number or products ordered is equal to number of 
  // products found in db
  // if not equal, return some message. 

  // you loop 

  // check quantity and price
  // forloop where i<= product count
  // if price ordered == to price found in db -> continue 
  // if quantity ordered is <= than the one found in db -> continue
  // else cancel order and exit 

  console.log(productIds);

  let newOrders = [];
  let newProductsOrdered = [];
  let total = 0;

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
        ProductId: product.productId,
        productName: product.productName,
        quantity: product.quantity,
        price: product.price,
        OrderId: newOrder.id,
        UserId: user.id
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
    return total + product.price * product.quantity;
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