const { Users } = require("../model/Users");

const authenticate = (req, res, next) => {
  const token = req.header("x-auth");

  Users.findByToken(token)
    .then(user => {
      if (!user) return Promise.reject();
      req.user = user;
      req.token = token;
      next();
    })
    .catch(err => {
      res.status(401).send();
    });
};

module.exports = {
  authenticate
};
