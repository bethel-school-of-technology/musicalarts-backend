'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.Buyer);
      this.belongsToMany(models.Inventory, { through: models.InventoryOrder });

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