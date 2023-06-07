const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Shoe extends Model {}

Shoe.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = Shoe;