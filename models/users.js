const { sequelize } = require("../db");
const { DataTypes } = require("sequelize");
const Users = sequelize.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idcard: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Users: Users };
