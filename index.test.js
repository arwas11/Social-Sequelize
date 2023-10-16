const { db } = require("./db/connection.js");
const { Comment, Like, Post, Profile, User } = require("./models/index.js");

describe("Social Sequelize Test", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await db.sync({ force: true });
    await Comment.bulkCreate([
      {
        body: "This is a great post!",
        createdAt: "2022-01-01T12:00:00Z",
      },
      {
        body: "I completely agree with you.",
        createdAt: "2022-01-02T08:30:00Z",
      },
      {
        body: "Can you explain this point further?",
        createdAt: "2022-01-02T10:45:00Z",
      },
      {
        body: "Thanks for sharing your thoughts.",
        createdAt: "2022-01-03T15:20:00Z",
      },
      {
        body: "I have a different opinion on this topic.",
        createdAt: "2022-01-04T09:10:00Z",
      },
    ]);

    await User.bulkCreate([
      {
        username: "john_doe",
        email: "john_doe@example.com",
      },
      {
        username: "jane_doe",
        email: "jane_doe@example.com",
      },
      {
        username: "bob_smith",
        email: "bob_smith@example.com",
      },
      {
        username: "alice_wonderland",
        email: "alice_wonderland@example.com",
      },
      {
        username: "tom_jones",
        email: "tom_jones@example.com",
      },
    ]);

    await Like.bulkCreate([
      {
        reactionType: "👍",
        createdAt: "2022-03-20T10:00:00Z",
      },
      {
        reactionType: "❤️",
        createdAt: "2022-03-21T12:30:00Z",
      },
      {
        reactionType: "😂",
        createdAt: "2022-03-22T15:45:00Z",
      },
      {
        reactionType: "🤔",
        createdAt: "2022-03-23T18:10:00Z",
      },
      {
        reactionType: "👎",
        createdAt: "2022-03-24T20:20:00Z",
      },
    ]);

    await Post.bulkCreate([
      {
        title: "Hiking in Yosemite",
        body: "I had an amazing time hiking in Yosemite National Park!",
        createdAt: "2022-03-15T10:30:00.000Z",
      },
      {
        title: "London Street Photography",
        body: "Here are some of my recent street photography shots from London.",
        createdAt: "2022-03-18T14:15:00.000Z",
      },
      {
        title: "New JavaScript Framework",
        body: "I'm excited to announce the release of our new JavaScript framework!",
        createdAt: "2022-03-21T09:00:00.000Z",
      },
      {
        title: "Harvard Yard in the Spring",
        body: "Spring is finally here! Here's a shot of Harvard Yard.",
        createdAt: "2022-03-25T11:45:00.000Z",
      },
      {
        title: "New Song Release",
        body: "Check out my latest song on Spotify!",
        createdAt: "2022-03-27T16:20:00.000Z",
      },
    ]);

    await Profile.bulkCreate([
      {
        bio: "I'm a software engineer",
        profilePicture: "https://example.com/profile1.jpg",
        birthday: "1990-06-15",
      },
      {
        bio: "I love to travel",
        profilePicture: "https://example.com/profile2.jpg",
        birthday: "1985-09-28",
      },
      {
        bio: "I'm a foodie",
        profilePicture: "https://example.com/profile3.jpg",
        birthday: "1992-01-10",
      },
      {
        bio: "I'm a fitness enthusiast",
        profilePicture: "https://example.com/profile4.jpg",
        birthday: "1988-11-22",
      },
      {
        bio: "I'm a musician",
        profilePicture: "https://example.com/profile5.jpg",
        birthday: "1995-03-01",
      },
    ]);
  });

  // Write your tests here

  test("Can create a user", async function () {
    const user11 = await User.create({
      username: "star11",
      email: "star@email.com",
    });
    expect(user11.username).toBe("star11");
  });

  test("Can create profile for user", async function () {
    const user11Profile = await Profile.create({
      bio: "my name is star11 and i like stars",
      profilePicture: "stars in the sky",
      birthday: "1-1-1111",
    });
    expect(user11Profile.profilePicture).toBe("stars in the sky");
  });

  test("can access post", async function() {
    const findPost = await Post.findByPk(1);
      expect(findPost.title).toBe('Hiking in Yosemite');
  });

  test("user has many likes", async function() {
    const findUser = await User.findByPk(3);
    const findLikes = await Like.findByPk(1);
    const giveLikes = await findUser.addLikes(findLikes);
    const userWithLikes = await User.findByPk(3, {include: Like});
      expect(userWithLikes.Likes[0]).toHaveProperty("reactionType");
  });

  test("user has a profile", async function() {
    const findUser = await User.findByPk(5);
    const findProfile = await Profile.findOne({where: {bio: "I'm a foodie"}})
    await findProfile.setUser(findUser);
    const foundProfile = await Profile.findOne({where: {bio: "I'm a foodie"}, include: User})
    expect(foundProfile.UserId).toBe(5);
  });

  test("post has many comments", async function() {
    const post = await Post.findByPk(3);
    const findComment1 = await Comment.findByPk(2);
    await findComment1.setPosts(post);
    const postIncluded = await Comment.findByPk(2, {include: Post})
    const CommentPost = await postIncluded.getPost();
      expect(postIncluded.PostID).toBe(3);
  });
});
