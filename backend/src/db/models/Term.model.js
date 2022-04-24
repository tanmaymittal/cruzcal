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
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
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
