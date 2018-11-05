const { mongoose } = require("./mongoose");

const PostSchema = new mongoose.Schema({
  timestamp: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  voteScore: {
    type: Number,
    required: true,
    default: 0
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false
  },
  commentCount: {
    type: Number,
    default: 0,
    required: true
  }
});

PostSchema.methods.toJSON = function() {
  const user = this;
  const obj = user.toObject();

  return {
    ...obj,
    id: obj._id,
    _id: undefined
  };
};

const Posts = mongoose.model("posts", PostSchema);

module.exports = {
  Posts
};
