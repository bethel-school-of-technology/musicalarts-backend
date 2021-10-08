'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.User);
      this.belongsToMany(models.Inventory, { through: models.InventoryOrder });
      this.hasOne(models.ShippingInfo);
      this.hasOne(models.PaymentMethod);

    }
  };
  Order.init({
    itemsOrdered: {
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