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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    userOne_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userTwo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userOne_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userTwo_score: {
      type: DataTypes.INTEGER
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