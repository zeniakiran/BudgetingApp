'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcryptjs");
const Joi = require("joi");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Group, {
        through : 'user_groups',
        foreignKey: 'userId',
      }),
      User.belongsToMany(models.Expense, {
        through : 'user_expenses',
        foreignKey: 'userId',
      })
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.prototype.generateHashedPassword = async(password)=> {
    let salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password
  }
  User.prototype.verifyPassword = async(pass,hash)=> {
    let result = bcrypt.compare(pass,hash)
    console.log("result",result)
    return result;
  }
  return User;
};
function validateSignup(data) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(4).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    }),
    password: Joi.string().min(7).max(30).required(),
  });
  return schema.validate(data, { abortEarly: false });
}
function validateLogin(data) {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    }),

    password: Joi.string().required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.validateSignup = validateSignup;
module.exports.validateLogin = validateLogin;