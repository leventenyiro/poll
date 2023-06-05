'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vote.belongsTo(models.Answer)
    }
  }
  Vote.init({
    username: DataTypes.STRING,
    answerId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vote',
  });
  return Vote;
};