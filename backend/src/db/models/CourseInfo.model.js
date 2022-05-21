const {DataTypes} = require('sequelize');

// Backlog, unravel term into another table to take advantage of primary key

/**
 *
 * @param {Sequelize} sequelize
 */
module.exports = function(sequelize) {
  sequelize.define('CourseInfo', {
    refnum: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    section: {
      allowNull: false,
      type: DataTypes.STRING,
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
      type: DataTypes.JSONB,
    },
    lectures: {
      allowNull: false,
      type: DataTypes.JSONB,
    },
    termcode: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'Terms',
        key: 'code',
      },
      onDelete: 'CASCADE',
    },
  });
};
