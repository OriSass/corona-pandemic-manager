'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class covidTests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  covidTests.init({
    id: DataTypes.INTEGER,
    patientId: DataTypes.INTEGER,
    isSick: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'covidTests',
  });
  return covidTests;
};