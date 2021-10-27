'use strict';

// const { Product } = require('./index');


const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductOrdered extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Order);
      this.belongsTo(models.Product);
      this.belongsTo(models.User);
    }
  };
  ProductOrdered.init({
    productName: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DECIMAL(10, 2)
    },
    quantity: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'ProductOrdered',
  });
  return ProductOrdered;
};