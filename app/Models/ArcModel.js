const { DataTypes } = require('sequelize');
const connection = require('../DataLayer/connectionWithSingleton');

const Arc = connection.define(
  "Arc",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Arc;
