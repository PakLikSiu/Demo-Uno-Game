'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("players", "gameId", {
      type: Sequelize.INTEGER,
      references: {
        model: 'games',
        key: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'players', 
      'gameId'
    );
  }
};
