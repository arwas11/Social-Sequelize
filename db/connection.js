const { Sequelize, DataTypes, Models } = require("sequelize");
const path = require("path");

const db = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "db.sequelize"),
});

module.exports = {
  db,
  DataTypes,
  Models,
};