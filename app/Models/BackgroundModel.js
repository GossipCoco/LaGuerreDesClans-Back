const { DataTypes } = require('sequelize');
const connection = require('../DataLayer/connectionWithSingleton');

const Background = connection.define(
    "Background",
    {
      Id: {
        type: DataTypes.STRING,
        primaryKey: true,
      }
    },
    { freezeTableName: true, timestamps: false }
  );
  module.exports = Background