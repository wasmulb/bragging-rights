const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Activities extends Model {}

Activities.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    activity_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'activities',
  }
);

module.exports = Activities;