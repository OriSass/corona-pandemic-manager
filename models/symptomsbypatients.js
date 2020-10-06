'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class symptomsByPatients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  symptomsByPatients.init({
    id: {type: DataTypes.INTEGER, primaryKey:true , allowNull: false},
    patientId: DataTypes.INTEGER,
    symptomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'symptomsByPatients',
    paranoid:true
  });
  return symptomsByPatients;
};