const { DataTypes } = require('sequelize');
const connection = require('../DataLayer/connectionWithSingleton');
const functions = require ('./Function')
const Quest = connection.define('Quest', {
    Id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    PointsReward: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    DateCreated: {
      
      type: 'DATETIME',
      defaultValue: new Date(functions.toDateTime(Date.now())).toISOString()
    
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  module.exports = Quest