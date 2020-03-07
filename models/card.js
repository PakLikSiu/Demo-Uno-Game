'use strict';
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    type: DataTypes.STRING,
    color: DataTypes.STRING,
    played: DataTypes.BOOLEAN,
    deckId: DataTypes.INTEGER,
    playerId: DataTypes.INTEGER
  }, {
    tableName: 'cards'
  });
  Card.associate = function(models) {
    // associations can be defined here
  };
  return Card;
};