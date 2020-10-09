'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hospitals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Patients, {foreignKey:'hospitalId'});
    }
  };
  Hospitals.init({
    id: {type: DataTypes.INTEGER, primaryKey:true },
    name: DataTypes.STRING,
    respiratorAmount: DataTypes.INTEGER,
    maxCapacity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Hospitals',
    paranoid:true
  });
  return Hospitals;
};