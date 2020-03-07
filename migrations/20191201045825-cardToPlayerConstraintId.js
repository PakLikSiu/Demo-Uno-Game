'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("cards", "playerId", {
      type: Sequelize.INTEGER,
      references: {
        model: 'players',
        key: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'card', 
      'playerId'
    );
  }
};
