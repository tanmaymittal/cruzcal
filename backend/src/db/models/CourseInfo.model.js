const { DataTypes, Sequelize } = require('sequelize');

// Backlog, unravel term into another table to take advantage of primary key

/**
 *
 * @param {Sequelize} sequelize
 */
module.exports = function (sequelize) {
  sequelize.define('CourseInfo', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    refnum: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    subject: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    coursenum: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    professor: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lectures: {
      allowNull: false,
      type: DataTypes.JSONB,
    },
  });
};
