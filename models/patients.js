'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Cities, {foreignKey: 'cityId'});
      this.belongsTo(models.Hospitals, {foreignKey: 'hospitalId'});
      this.hasMany(models.CovidTests, {foreignKey: 'patientId'});
      this.hasMany(models.SymptomsByPatients, {foreignKey: 'patientId'});
    }

  };
  Patients.init({
    id: {type: DataTypes.INTEGER, primaryKey:true },
    dateOfBirth: DataTypes.DATE,
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    cityId: DataTypes.INTEGER,
    hospitalId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Patients',
    paranoid:true
  });
  return Patients;
};