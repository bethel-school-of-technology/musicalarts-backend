var express = require("express");
var router = express.Router();
const { PaymentMethod } = require("../models");
var auth = require("../services/auth");

router.post("/", async (req, res, next) => {
  PaymentMethod.create({
    cardNumber: req.body.cardNumber,
    expirationDate: req.body.expirationDate,
    cvv: req.body.cvv,
    phoneNumber: req.body.phoneNumber,
  })
    .then((newPaymentMethod) => {
      res.json(newPaymentMethod);
    })
    .catch(() => {
      res.status(400).send();
    });
});

module.exports = router;
