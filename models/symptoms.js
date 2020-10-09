'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Symptoms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Patients, {through: 'symptoms_by_patients'});
    }
  };
  Symptoms.init({
    id: {type: DataTypes.INTEGER, primaryKey:true , allowNull: false},
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Symptoms',
    paranoid:true
  });
  return Symptoms;
};