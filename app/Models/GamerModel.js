// Sequelize model for Message
const { Model, DataTypes } = require('sequelize');
const connection = require('../DataLayer/connectionWithSingleton'); // Assuming your Sequelize instance
const functions = require ('./Function')
const Gamer = connection.define(
    "Gamer",
    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Définit le champ comme auto-incrémenté
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        UserId: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: {
                model: 'User', // Nom de la table de référence
                key: 'Id' // Nom de la clé de référence
            }
        },
        UserName: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        Image: {
            type: DataTypes.STRING(255)
        },
        Description: {
            type: DataTypes.TEXT
        },
        Biography: {
            type: DataTypes.TEXT
        },
        ClanId: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: {
                model: 'Clan', // Nom de la table de référence
                key: 'Id' // Nom de la clé de référence
            }
        },
        Status: {
            type: DataTypes.STRING(255)
        },
        Genre: {
            type: DataTypes.STRING(255)
        },
    },
    {
        tableName: 'Gamer', // Nom de la table
        timestamps: true // Gère automatiquement createdAt et updatedAt
    }
);

module.exports = Gamer;