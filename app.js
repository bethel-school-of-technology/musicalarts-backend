var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var models = require('./models');
var auth = require('./services/auth');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var inventoryRouter = require('./routes/inventory');
var ordersRouter = require('./routes/orders');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

models.sequelize.sync({ alter: true }).then(function () {
    console.log("DB Sync'd up")
});

app.use(async (req, res, next) => {
  // Get the token from the request
  const header = req.headers.authorization;

  if (!header) {
    return next();
  }

  const token = header.split(' ')[1];

  // Validate token / get the user
  const user = await auth.verifyUser(token);
  req.user = user;
  next();

});


// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/inventory', inventoryRouter);
app.use('/orders', ordersRouter);



module.exports = app;
