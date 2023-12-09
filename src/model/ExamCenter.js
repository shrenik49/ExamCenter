const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const ExamCenter = sequelize.define('examcenter1', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lat: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true,
  },
  lon: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'examcenter1',
  timestamps: false,
});

module.exports = ExamCenter;
