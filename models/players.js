'use strict';
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    score: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    chatId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    turn: DataTypes.BOOLEAN,
    position: DataTypes.INTEGER,
    //score: DataTypes.INTEGER
  }, {
    tableName: 'players'
  });
  Player.associate = function(models) {
    Player.belongsTo(models.User, {
        foreignKey: "userId"
    })
  };
  return Player;
};