'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class from extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  from.init({
    form_name: DataTypes.STRING,
    form_filds: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'from',
  });
  return from;
};