const { DataTypes } = require('sequelize');
const connection = require('../DataLayer/connectionWithSingleton');

const Parallax = connection.define(
    "Parallax",
    {
      Id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      Image: {
        type: DataTypes.STRING,
      },
      Position: {
        type: DataTypes.STRING,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
  module.exports = Parallax