const { DataTypes } = require('sequelize');
const connection = require('../DataLayer/connectionWithSingleton');

const Book = connection.define(
  "Book",
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
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Book;
