const {DataTypes} = require('sequelize');

// Backlog, unravel term into another table to take advantage of primary key

module.exports = function(sequelize) {
  sequelize.define('CourseInfo', {
    CourseName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    CourseRefNum: {
      allowNull: false,
      type: DataTypes.STRING
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