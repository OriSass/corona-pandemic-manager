'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SymptomsByPatients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Patients, {foreignKey: 'patientId'});
      this.belongsTo(models.Symptoms, {foreignKey: 'symptomId'});
    }
  };
  SymptomsByPatients.init({
    id: {type: DataTypes.INTEGER, primaryKey:true , allowNull: false},
    patientId: DataTypes.INTEGER,
    symptomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SymptomsByPatients',
    paranoid:true
  });
  return SymptomsByPatients;
};