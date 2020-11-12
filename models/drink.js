'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class drink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.drink.belongsToMany(models.user, {through: 'userdrinks'})

    }
  };
  drink.init({
    name: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    instructions: DataTypes.TEXT,
    picture: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'drink',
  });
  return drink;
};