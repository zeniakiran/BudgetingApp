"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Expense.belongsToMany(User, {
        through: "expense_user",
        as: "users",
        foreignKey: "expense_id",
      });
    }
  }
  Expense.init(
    {
      amount: DataTypes.INTEGER,
      type: DataTypes.STRING,
      description: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      group_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Expense",
    }
  );
  return Expense;
};
