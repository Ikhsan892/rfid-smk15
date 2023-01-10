const { sequelize } = require("../db");
const { DataTypes } = require("sequelize");
const { Users } = require("./users");
const Absence = sequelize.define(
  "absence",
  {
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    idcard: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    masuk: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    pulang: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
Absence.belongsTo(Users);

module.exports = { Absence: Absence };
