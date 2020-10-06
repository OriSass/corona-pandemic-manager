'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class patients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.cities, {foreignKey: 'cityId'});
      this.belongsTo(models.hospitals, {foreignKey: 'hospitalId'});
      this.hasMany(models.covidTests, {foreignKey: 'patientId'});
      this.belongsToMany(models.symptoms, {through: 'symptoms_by_patients'});
    }
  };
  patients.init({
    id: {type: DataTypes.INTEGER, primaryKey:true },
    dateOfBirth: DataTypes.DATE,
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    cityId: DataTypes.INTEGER,
    hospitalId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'patients',
    paranoid:true
  });
  return patients;
};