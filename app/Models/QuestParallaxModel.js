const { DataTypes } = require('sequelize');
const connection = require('../DataLayer/connectionWithSingleton');

const QuestParallax = connection.define(
    "QuestParallax",
    {
      Id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      
      translateZ: {
        type: DataTypes.STRING,
      },
      translateY: {
        type: DataTypes.STRING,
      },
      translateX: {
        type: DataTypes.STRING,
      },
      scale: {
        type: DataTypes.STRING,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
  module.exports = QuestParallax