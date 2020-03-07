'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    tableName: 'users'
  });
  User.associate = function(models) {
    // User.hasMany(models.Message)
  };
  return User;
};