const { Sequelize } = require("sequelize");
const db = {};

const sequelize = new Sequelize("rfid", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  // logging: console.log,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  timezone: "+07:00",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

exports.sequelize = sequelize;
exports.db = db;
