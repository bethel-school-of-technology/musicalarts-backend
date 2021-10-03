'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // this.belongsTo(models.User);
      // this.belongsTo(models.Inventory);
      // this.hasMany(models.ItemsOrdered, {
      //   foreignKey: 'id'
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