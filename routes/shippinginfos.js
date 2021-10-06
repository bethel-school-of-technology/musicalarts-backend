var express = require("express");
var router = express.Router();
const { ShippingInfo } = require("../models");
var auth = require("../services/auth");

router.post("/", async (req, res, next) => {
  ShippingInfo.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
  })
    .then((newShippingInfo) => {
      res.json(newShippingInfo);
    })
    .catch(() => {
      res.status(400).send();
    });
});

module.exports = router;
