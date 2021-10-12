'use strict';
const {
  Model
} = require('sequelize');
const order = require('./order');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsTo(models.User);
      this.belongsToMany(models.Order, { through: models.ProductOrder });
      this.belongsToMany(models.Cart, { through: models.CartItem});
    }
  };
  Product.init({
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.ENUM('music', 'art'),
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};