const Comment = require("./Comment");
const Like = require("./Like");
const Post = require("./Post");
const Profile = require("./Profile");
const User = require("./User");


// Defining Associations

//User/Profile
//User can have one Profile and vice versa
User.hasOne(Profile);
Profile.belongsTo(User)

// User/Like
// User can have many Like instances and vice versa
User.belongsToMany(Like, { though: "User-Like" });
Like.belongsToMany(User, { though: "User-Like" });

// Post/User
// User can have many Post instances, but a Post can only have one User
User.hasMany(Post);
Post.belongsTo(User);

// Post/Comment
//Post can have many Comment instances, but a Comment can only have one Post
Post.hasMany(Comment);
Comment.belongsTo(Post)

module.exports = {
    Comment,
    Like,
    Post,
    Profile,
    User
}