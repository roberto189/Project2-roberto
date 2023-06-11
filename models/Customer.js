const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt")

class Customer extends Model {}

Customer.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.FLOAT
    },
    lng: {
      type: DataTypes.FLOAT
    },
    ShoeCapacity: {
      type: DataTypes.INTEGER,
      // allowNull: false
    }
  },
  {
    sequelize,
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
  }
);

module.exports = Customer;