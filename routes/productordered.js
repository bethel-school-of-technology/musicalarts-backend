var express = require('express');
var router = express.Router();
const { ProductOrdered } = require('../models');
var auth = require('../services/auth');

router.get('/order-listing', function (req, res, next) {
    const user = req.user;
    if (!user) {
        res.status(403).send();
        return;
    }
    ProductOrdered.findAll({
        where: { UserId: user.id },
    }).then(
        (orderListings) => {
            if (orderListings) {
                res.json(orderListings);
            } else {
                res.status(404).send();
            }
        },
        (err) => {
            res.status(500).send(err);
        }
    );
});




module.exports = router;