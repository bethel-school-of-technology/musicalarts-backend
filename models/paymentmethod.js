"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Order);
      
    }
  }
  PaymentMethod.init(
    {
      cardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expirationDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cvv: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PaymentMethod",
    }
  );
  return PaymentMethod;
};
