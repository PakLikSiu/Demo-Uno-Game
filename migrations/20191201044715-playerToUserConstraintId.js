'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("players", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'players', 
      'userId'
    );
  }
};
