'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Item, {
        foreignKey: 'userId'
      });
      this.hasMany(models.Art, {
        foreignKey: 'userId'
      });
    }
  };
  User.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    buyerAccount: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    sellerAccount: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    adminAccount: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    sellerId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    buyerId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};