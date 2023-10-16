const { sequelize, Sequelize, DataTypes, Model } = require("sequelize");
const path = require("path");

const db = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "db.sqlite"),
  logging: false, 
});

// async function connect(){
//   try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }
// };

// connect();

module.exports = {
  db,
  DataTypes,
  Model
};