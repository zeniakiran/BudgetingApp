'use strict';
const {
  Model
} = require('sequelize');
const Joi = require("joi");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.belongsToMany(models.User, {
        through : 'user_groups',
        foreignKey: 'groupId',
      })
      Group.hasMany(models.Expense, {
        as: 'group',
      })
    }
  }
  Group.init({
    
    name: DataTypes.STRING
  }, {
    hooks: {
      beforeValidate: (group) => {
        console.log("New group created with name ",group.name)
      }
    },
    sequelize,
    modelName: 'Group',
  });
  
  return Group;
};
function validateGroup(data) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(30).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.validateGroup = validateGroup;

