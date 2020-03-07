'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    chatName: DataTypes.STRING
    // gameId: DataTypes.INTEGER
  }, {
    tableName: 'chats'
  });
  Chat.associate = function(models) {
    // associations can be defined here
  };
  return Chat;
};