const { Categories } = require("../model/Categories");
const { Posts } = require("../model/Posts");

const categories = {
  getAll: () => Categories.find()
};

const posts = {
  getByCategory: category => Posts.find({ category }),

  get: id => Posts.findById(id),

  getAll: () => Posts.find({ deleted: false }),

  add: post => {
    const { title, timestamp, body, author, category } = post;
    const newPost = new Posts({
      title,
      timestamp,
      body,
      author,
      category
    });

    return newPost.save();
  },

  vote: (_id, option) =>
    Posts.findOneAndUpdate(
      { _id },
      {
        $inc: {
          voteScore: option === "upVote" ? 1 : -1
        }
      },
      {
        new: true
      }
    ),

  disable: _id =>
    Posts.findOneAndUpdate(
      { _id },
      {
        deleted: true
      },
      {
        new: true
      }
    ),

  edit: (_id, post) =>
    Posts.findOneAndUpdate(
      { _id },
      {
        title: post.title,
        body: post.body
      },
      {
        new: true
      }
    ),

  incrementCommentCounter: _id =>
    Posts.findOneAndUpdate(
      { _id },
      {
        $inc: {
          commentCount: 1
        }
      },
      {
        new: true
      }
    )
};

module.exports = {
  categories,
  posts
};
