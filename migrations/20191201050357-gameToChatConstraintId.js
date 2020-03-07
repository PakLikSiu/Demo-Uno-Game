'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("games", "chatId", {
      type: Sequelize.INTEGER,
      references: {
        model: 'chats',
        key: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'game', 
      'chatId'
    );
  }
};
