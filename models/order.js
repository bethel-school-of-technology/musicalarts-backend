'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    
    static associate(models) {
      this.belongsTo(models.User);
      this.belongsToMany(models.Product, { through: models.ProductOrder });
      this.hasOne(models.ShippingInfo);
      this.hasOne(models.PaymentMethod);

    }
  };
  Order.init({
    productsOrdered: {
      type: DataTypes.STRING
    },
    totalPrice: {
      type: DataTypes.INTEGER
    },
    purchaseDate: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};