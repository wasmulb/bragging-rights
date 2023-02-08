const { Model, DataTypes} = require('sequelize');
// const bcrypt = require('bcrypt')
const sequelize = require('../config/connection');

class Partners extends Model {}

Partners.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'partners',
  }
);

module.exports = Partners;