'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hospitals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  hospitals.init({
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    respiratorAmount: DataTypes.INTEGER,
    maxCapacity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'hospitals',
  });
  return hospitals;
};