'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    messageBody: DataTypes.TEXT,
    time: DataTypes.DATE,
    chatId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    tableName: "messages"
  });
  Message.associate = function(models) {
    Message.belongsTo(models.User, {
        foreignKey: "userId"
    })
  };
  return Message;
};