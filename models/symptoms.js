'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class symptoms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  symptoms.init({
    id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'symptoms',
  });
  return symptoms;
};