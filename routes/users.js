var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const { User } = require('../models');
var auth = require('../services/auth');

/* GET all users */
router.get('/', function(req, res, next) {
  User.findAll().then(userList => {
    res.json(userList);
  })
});

/* GET /:id get an individual user */
router.get('/:id', (req, res, next) => {
  const userId = parseInt(req.params.id);

  User.findOne({
    where: {
      id: userId
    }
  }).then(theUser => {
    if (theUser) {
      res.json(theUser);
    } else {
      res.status(404).send();
    }
  }, err => {
    res.status(500).send(err);
  })
});

/* POST create a user */
router.post('/', async (req, res, next) => {
  
  if (!req.body.username || !req.body.password) {
    res.status(400).send('Username and Password Required');
    return;
  }

  // Hash the password */

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    // accountType: req.body.accountType,
    password: hashedPassword
  })
    .then((newUser) => {
      res.json(newUser);
  })
    .catch(() => {
      res.status(400).send();
  });
});

// POST SignIn a user */
router.post('/signin', async ( req, res, next ) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(async user => {
    //check if user exists
    if (!user) {
      res.status(404).send('Invalid username');
      return;
    }
    //check the password
    const valid = await bcrypt.compare(req.body.password, user.password);

    if (valid){
    //create the token
      const jwt = auth.createJWT(user);
      res.status(200).send({ jwt });
    } else {
      res.status(401).send('Invalid password');
    }

  });
});

/* PUT update a user */
router.put('/:id', ( req, res, next ) => {
  const userId = parseInt(req.params.id);

  if (!userId || userId <= 0) {
    res.status(400).send('Invalid ID');
    return;
  }

  User.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    accountType: req.body.accountType,
    password: req.body.password
  }, {
    where: {
      id: userId
    }
  }).then(() => {
    res.status(204).send();
  }).catch(() => {
    res.status(400).send();
  })
});

/* DELETE a user */
router.delete('/:id', ( req, res, next ) => {
  const userId = parseInt(req.params.id);

  if (!userId || userId <= 0) {
    res.status(400).send('Invalid ID');
    return;
  }

  User.destroy({
    where: {
      id: userId
    }
  }).then(() => {
    res.status(204).send();
  }).catch(() => {
    res.status(400).send();
  })
});


module.exports = router;
