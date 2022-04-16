const {DataTypes, Sequelize} = require('sequelize');

// Backlog, unravel term into another table to take advantage of primary key

/**
 * 
 * @param {Sequelize} sequelize 
 */
module.exports = function(sequelize) {
  sequelize.define('CourseInfo', {
    CourseName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    CourseRefNum: {
      allowNull: false,
      type: DataTypes.STRING(5),
    },
    Subject: {
      allowNull: false,
      type: DataTypes.STRING
    },
    SubjectCourseNum: {
      allowNull: false,
      type: DataTypes.STRING
    },
    Lectures: {
      allowNull: false,
      type: DataTypes.JSONB
    },
    Term: {
      allowNull: false,
      type: DataTypes.JSONB
    },
  })
};