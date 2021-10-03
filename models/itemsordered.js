'use strict';
const nodemon = require('nodemon');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemsOrdered extends Model {
    static associate(models) {
      // this.belongsTo(models.Order);
    }
  };
  ItemsOrdered.init({
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ItemsOrdered',
  });
  return ItemsOrdered;
};