'use strict';
const {
  Model
} = require('sequelize');
const Joi = require("joi");
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Expense.belongsToMany(models.User, {
        through : 'user_expenses',
        foreignKey: 'expId',
      }),
      Expense.belongsTo(models.Group, {
        foreignKey: "group_id",
        as: "expense",
      });
    }
  };
  Expense.init({
    amount: DataTypes.INTEGER,
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    created_by: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};
function validateExpense(data) {
  const schema = Joi.object({
    amount: Joi.number().integer().min(10).max(100000).required(),
    type: Joi.string().required(),
    created_by: Joi.number().integer().required(),
    group_id: Joi.number().integer().required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.validateExpense = validateExpense;