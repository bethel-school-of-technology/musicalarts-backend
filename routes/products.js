// const { response } = require('express');
// const e = require('express');
var express = require('express');
// const { ne } = require('sequelize/types/lib/operators');
var router = express.Router();
const { Product } = require('../models');
var auth = require('../services/auth');


/* POST create an item */
router.post('/', async (req, res, next) => {

  // Validate token / get the user
  const user = req.user;

  if (!user) {
    res.status(403).send();
    return;
  }
  // Create the product with the user id
  Product.create({
    productName: req.body.productName,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price,
    location: req.body.location,
    genre: req.body.genre,
    category: req.body.category,
    imageUrl: req.body.imageUrl,
    UserId: user.id
  }).then(newProduct => {
    res.json(newProduct);
  }).catch(() => {
    res.status(400).send();
  });
});


/* GET all products */
router.get('/', function(req, res, next) {
  Product.findAll().then(productList => {
    res.json(productList);
  })
});

/* GET Single User's items - Alexa's additions */
router.get('/user-listing', function (req, res, next) {
  const user = req.user;
  if (!user) {
    res.status(403).send();
    return;
  }
  Product.findAll({
    where: { UserId: user.id },
  }).then(
    (userListings) => {
      if (userListings) {
        res.json(userListings);
      } else {
        res.status(404).send();
      }
    },
    (err) => {
      res.status(500).send(err);
    }
  );
});

/* GET /:id get an individual product */
router.get('/:id', (req, res, next) => {
  const productId = parseInt(req.params.id);

  Product.findOne({
    where: {
      id: productId
    }
  }).then(theProduct => {
    if (theProduct) {
      res.json(theProduct);
    } else {
      res.status(404).send();
    }
  }, err => {
    res.status(500).send(err);
  })
});

/* PUT update a product */
router.put('/:id', ( req, res, next ) => {
  const productId = parseInt(req.params.id);

  if (!productId || productId <= 0) {
    res.status(400).send('Invalid ID');
    return;
  }

  const user = req.user;

  if (!user) {
    res.status(403).send();
    return;
  }

  Product.update({
    productName: req.body.productName,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price,
    location: req.body.location,
    genre: req.body.genre,
    category: req.body.category,
    imageUrl: req.body.imageUrl
  }, {
    where: {
      id: productId
    }
  }).then(() => {
    res.status(204).send();
  }).catch(() => {
    res.status(400).send();
  })
});

/* DELETE a product */
router.delete('/:id', ( req, res, next ) => {
  const productId = parseInt(req.params.id);

  if (!productId || productId <= 0) {
    res.status(400).send('Invalid ID');
    return;
  }

  const user = req.user;

  if (!user) {
    res.status(403).send();
    return;
  }  


  Product.destroy({
    where: {
      id: productId
    }
  }).then(() => {
    res.status(204).send();
  }).catch(() => {
    res.status(400).send();
  })
});

/* POST products to the shopping cart  */

// router.post('/shoppingcart', async ( req, res, next ) => {

//   const user = req.user;

//   if (!user) {
//     res.status(403).send();
//     return;
//   }

//   const productId = parseInt(req.params.id);
//   let fetchedCart;
//   let newQuantity = 1;
//   req.user
//     .getCart()
//     .then(Cart => {
//       fetchedCart = Cart;
//       return cart.getProduct({
//         where: {
//           id: productId
//         }
//       });
//     })
//     .then(products => {
//       let product;
//       if(products.length > 0) {
//         product = products[0];
//       }
//       if (product) {
//         const oldQuantity = product.cartItem.quantity;
//         newQuantity = oldQuantity + 1;
//         return product;
//       } else {
//         return Product.findByPk(productId);
//       }
//     })
//     .then((product) => {
//       return fetchedCart.addInventory(product, {
//         through: {
//           quantity: newQuantity
//         }
//       });
//     })
//     .catch(err => console.error(err));


// });

/* GET products in the shopping cart  */



module.exports = router;
