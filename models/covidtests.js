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
      this.belongsTo(models.patients, {foreignKey: 'patientId'});
    }
  };
  covidTests.init({
    id: {type: DataTypes.INTEGER, primaryKey:true , allowNull:false},
    patientId: DataTypes.INTEGER,
    isSick: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'covidTests',
    paranoid:true
  });
  return covidTests;
};