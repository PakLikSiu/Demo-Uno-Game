'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("games", "deckId", {
      type: Sequelize.INTEGER,
      references: {
        model: 'decks',
        key: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'game', 
      'deckId'
    );
  }
};
