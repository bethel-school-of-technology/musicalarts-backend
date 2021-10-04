'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // this.belongsToMany(models.Inventory, { through: 'inventory_orders' });
      // this.belongsTo(models.Buyer, {
      //   foreignKey: {
      //     allowNull: false,
      //   },
      // });
    }
  };
  Order.init({
    itemsOrdered: DataTypes.STRING,
    totalPrice: DataTypes.INTEGER,
    purchaseDate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};