const { DataTypes } = require("sequelize");
const db = require("../db");

const Battery = db.define("battery", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  actualMAH: {
    type: DataTypes.FLOAT.UNSIGNED,
    allowNull: false,
  },
});

module.exports = Battery;