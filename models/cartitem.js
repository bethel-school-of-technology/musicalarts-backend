'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {

    static associate(models) {
      // define association here
    }
  };
  CartItem.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};