'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.patients, {foreignKey:'cityId'});
    }
  };
  cities.init({
    id: {type: DataTypes.INTEGER, primaryKey:true },
    name: DataTypes.STRING,
    population: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cities',
    paranoid:true
  });
  return cities;
};