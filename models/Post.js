const { db, DataTypes, Model } = require("../db/connection");

class Post extends Model {}

Post.init(
  {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    // createdAt: DataTypes.STRING,
  },
  {
    sequelize: db,
    modelName: "Post"
  }
);

db.sync();

module.exports = {Post};
