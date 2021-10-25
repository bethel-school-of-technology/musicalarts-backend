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
      this.hasOne(models.Product, {
        foreignKey: 'id',
        localKey: 'productId'
      });
    }
  };
  ProductOrdered.init({
    productId: {
      type: DataTypes.INTEGER
    },
    productName: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DECIMAL(10, 2)
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'ProductOrdered',
  });
  return ProductOrdered;
};