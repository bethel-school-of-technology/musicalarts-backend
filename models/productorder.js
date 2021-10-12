'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductOrder extends Model {

    static associate(models) {
      // define association here
    }
  };
  ProductOrder.init({
    quantity: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'ProductOrder',
  });
  return ProductOrder;
};