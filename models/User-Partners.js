const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class UserPartners extends Model {}

UserPartners.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    partners_id: {
      type: DataTypes.INTEGER,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user-partner',
  }
);

module.exports = UserPartners;