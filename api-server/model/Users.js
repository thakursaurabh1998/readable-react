const { mongoose } = require("./mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: true,
  //   trim: true
  // },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ],
  avatar: {
    type: String
  }
});

// no arrow function should be used
UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = "auth";
  const token = jwt.sign({ _id: user._id.toHexString(), access }, secret);

  user.tokens.push({
    access,
    token
  });

  return user.save().then(() => token);
};

// overrides the json document which is returned after performing a function
UserSchema.methods.toJSON = function() {
  const user = this;
  const { _id, email } = user.toObject();

  return { _id, email };
};

// custom findby to find document by token
UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, secret);
  } catch (error) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
};

// mongodb runs this middleware before saving the document
UserSchema.pre("save", function(next) {
  const user = this;
  if(user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
});

const Users = mongoose.model("users", UserSchema);

module.exports = {
  Users
};
