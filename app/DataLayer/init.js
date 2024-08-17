const models = require('../Models');
require('../Models/associations');

// Synchronisation des modèles
const sequelize = models.sequelize;

sequelize.authenticate()
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = models;
