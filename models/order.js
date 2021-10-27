'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {

    static associate(models) {
      this.belongsTo(models.User);
      this.hasMany(models.ProductOrdered, {
        foreignKey: 'OrderId'
      });
    }
  };
  Order.init({

    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    buyerFirstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    buyerLastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    buyerEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    buyerPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    streetAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nameOnCard: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cardExpirationDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cardCvv: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};