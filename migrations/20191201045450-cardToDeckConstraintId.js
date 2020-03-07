'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("cards", "deckId", {
      type: Sequelize.INTEGER,
      references: {
        model: 'decks',
        key: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'card', 
      'deckId'
    );
  }
};
