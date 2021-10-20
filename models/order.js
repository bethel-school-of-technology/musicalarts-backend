'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {

    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      // this.belongsToMany(models.Product, { through: models.ProductsOrdered, foreignKey: 'orderId' });
      this.hasMany(models.ProductOrdered);
      this.hasOne(models.ShippingInfo);
      this.hasOne(models.PaymentMethod);

    }
  };
  Order.init({

    totalPrice: {
      type: DataTypes.DECIMAL(10, 2)
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};