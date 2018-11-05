const { mongoose } = require("./mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  path: {
    type: String,
    required: true,
    trim: true
  }
});

const Categories = mongoose.model("categories", CategorySchema);

module.exports = {
  Categories
};
