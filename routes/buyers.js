var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
const { Buyer } = require("../models");
var auth = require("../services/auth");

/* GET all buyers */
router.get("/", function (req, res, next) {
  Buyer.findAll().then((buyerList) => {
    res.json(buyerList);
  });
});

/* GET /:id get an individual buyer */
router.get("/:id", (req, res, next) => {
  const buyerId = parseInt(req.params.id);

  Buyer.findOne({
    where: {
      id:  buyerId,
    },
  }).then(
    (theBuyer) => {
      if (theBuyer) {
        res.json(theBuyer);
      } else {
        res.status(404).send();
      }
    },
    (err) => {
      res.status(500).send(err);
    }
  );
});

/* POST create a buyer */


router.post("/", async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send("Username and Password Required");
    return;
  }

  // Hash the password */

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  Buyer.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    // accountType: req.body.accountType,
    password: hashedPassword,
  })
    .then((newBuyer) => {
      res.json(newBuyer);
    })
    .catch(() => {
      res.status(400).send();
    });
});

// POST SignIn a buyer */
router.post("/signin", async (req, res, next) => {
  Buyer.findOne({
    where: {
      username: req.body.username,
    },
  }).then(async (buyer) => {
    //check if buyer exists
    if (!buyer) {
      res.status(404).send("Invalid username");
      return;
    }
    //check the password
    const valid = await bcrypt.compare(req.body.password, buyer.password);

    if (valid) {
      //create the token
      const jwt = auth.createJWT(buyer);
      res.status(200).send({ jwt });
    } else {
      res.status(401).send("Invalid password");
    }
  });
});

// GET SignOut a buyer */
// router.get('/signout', function (req, res, next) {
//   res.cookie('jwt', "", { expires: new Date(0) });
//   res.redirect('/users/login');
//   });

/* PUT update a buyer */
router.put("/:id", (req, res, next) => {
  const buyerId = parseInt(req.params.id);

  if (!buyerId || buyerId <= 0) {
    res.status(400).send("Invalid ID");
    return;
  }

  Buyer.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      accountType: req.body.accountType,
      password: req.body.password,
    },
    {
      where: {
        id: buyerId,
      },
    }
  )
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.status(400).send();
    });
});

/* DELETE a buyer */
router.delete("/:id", (req, res, next) => {
  const buyerId = parseInt(req.params.id);

  if (!buyerId || buyerId <= 0) {
    res.status(400).send("Invalid ID");
    return;
  }

  Buyer.destroy({
    where: {
      id: buyerId,
    },
  })
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.status(400).send();
    });
});

module.exports = router;