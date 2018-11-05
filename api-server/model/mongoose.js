const mongoose = require("mongoose");
const { mongourl } = require("../config");

mongoose.Promise = global.Promise;
mongoose
  .connect(
    mongourl,
    { useNewUrlParser: true }
  )
  .catch(err => console.log(err));

module.exports = { mongoose };
