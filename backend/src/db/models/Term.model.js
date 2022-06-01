const {DataTypes} = require('sequelize');

/**
 *
 * @param {Sequelize} sequelize
 */
module.exports = function(sequelize) {
  sequelize.define('Term', {
    code: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      validator: {
        min: 0,
      },
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    start: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    end: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
  });
};
