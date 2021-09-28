'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      this.belongsTo(models.User);
    }
  };
  Item.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    musicType: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    artType: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};