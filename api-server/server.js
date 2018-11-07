require("dotenv").config();

const cookieParser = require("cookie-parser");
const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const {
  port,
  client_id,
  client_secret,
  redirect_uri,
  state
} = require("./config");
const { categories, posts } = require("./util/util");
const comments = require("./comments");
const { Users } = require("./model/Users");
const { authenticate } = require("./middleware/authenticate");

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

app.use((req, res, next) => {
  const now = new Date().toString();

  console.log(`${now} ${req.method} ${req.url}`);
  next();
});

app.delete("/users/me/token", authenticate, (req, res) => {
  // user object is set in authenticate middleware in authenticate.js
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).send();
    },
    () => {
      res.status(400).send();
    }
  );
});

app.post("/user/login", (req, res) => {
  const { email, password } = req.body;
  Users.findByCredentials(email, password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res
          .set("x-auth", token)
          .status(200)
          .send(user);
      });
    })
    .catch(err => {
      res.status(401).send({ error: "Password Incorrect" });
    });
});

app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  const user = new Users({ email, password });

  user
    .save()
    .then(user => user.generateAuthToken())
    .then(token => {
      res.header("x-auth", token).send(user);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.post("/logout", authenticate, (req, res) => {
  req.user
    .removeToken(req.token)
    .then(data => {
      res.status(200).send();
    })
    .catch(err => {
      res.status(400).send();
    });
});

app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

app.get("/oauth/redirect", (req, res) => {
  let code;
  if (req.query.error) {
    console.log(JSON.stringify(req.query.error_description));
  } else {
    code = req.query.code;
    request.post(
      {
        headers: { Accept: "application/json" },
        url: `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${redirect_uri}&state=${state}`
      },
      (error, response, body) => {
        if (error) res.status(400).send(error);
        else {
          request.get(
            {
              headers: {
                Accept: "application/json",
                Authorization: "token " + JSON.parse(body).access_token,
                "User-Agent": "thakursaurabh1998"
              },
              url: `https://api.github.com/user`
            },
            (error, response, body) => {
              const { email, avatar_url, name } = JSON.parse(body);
              const user = new Users({ email, avatar_url, name });
              user
                .save()
                .then(u => u.generateAuthToken())
                .then(obj => {
                  res.cookie("x-auth", obj.token).res(obj.user);
                })
                .catch(err => {
                  console.log(err);
                  Users.findOne({ email })
                    .then(u => u.generateAuthToken())
                    .then(obj => {
                      res.cookie("x-auth", obj.token).send(obj.user);
                    })
                    .catch(err => res.status(404).send(err));
                });
            }
          );
        }
      }
    );
  }
});

app.get("/login", (req, res) => {
  res.set("Content-Type", "text/html");
  const htm = `<a href="https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}">Login</a>`;
  res.send(htm);
});

app.get("/", (req, res) => {
  const help = `
  <pre>
    Welcome to the Udacity Readable API!

    Use an Authorization header to work with your own data:

    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})

    The following endpoints are available:

    GET /categories
      USAGE:
        Get all of the categories available for the app. List is found in categories.js.
        Feel free to extend this list as you desire.

    GET /:category/posts
      USAGE:
        Get all of the posts for a particular category

    GET /posts
      USAGE:
        Get all of the posts. Useful for the main page when no category is selected.

    POST /posts
      USAGE:
        Add a new post

      PARAMS:
        id - UUID should be fine, but any unique id will work
        timestamp - timestamp in whatever format you like, you can use Date.now() if you like
        title - String
        body - String
        author - String
        category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.

    GET /posts/:id
      USAGE:
        Get the details of a single post

    POST /posts/:id
      USAGE:
        Used for voting on a post
      PARAMS:
        option - String: Either "upVote" or "downVote"

    PUT /posts/:id
      USAGE:
        Edit the details of an existing post
      PARAMS:
        title - String
        body - String

    DELETE /posts/:id
      USAGE:
        Sets the deleted flag for a post to 'true'.
        Sets the parentDeleted flag for all child comments to 'true'.

    GET /posts/:id/comments
      USAGE:
        Get all the comments for a single post

    POST /comments
      USAGE:
        Add a comment to a post

      PARAMS:
        id: Any unique ID. As with posts, UUID is probably the best here.
        timestamp: timestamp. Get this however you want.
        body: String
        author: String
        parentId: Should match a post id in the database.

    GET /comments/:id
      USAGE:
        Get the details for a single comment

    POST /comments/:id
      USAGE:
        Used for voting on a comment.
      PARAMS:
        option - String: Either "upVote" or "downVote"

    PUT /comments/:id
      USAGE:
        Edit the details of an existing comment

      PARAMS:
        timestamp: timestamp. Get this however you want.
        body: String

    DELETE /comments/:id
      USAGE:
        Sets a comment's deleted flag to 'true'
 </pre>
  `;

  res.send(help);
});

app.get("/categories", (req, res) => {
  categories.getAll().then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: "There was an error."
      });
    }
  );
});

app.get("/:category/posts", (req, res) => {
  posts.getByCategory(req.params.category).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: "There was an error."
      });
    }
  );
});

app.get("/posts", authenticate, (req, res) => {
  posts.getAll(req.token).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: "There was an error."
      });
    }
  );
});

app.post("/posts", (req, res) => {
  posts.add(req.body).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: "There was an error."
      });
    }
  );
});

app.get("/posts/:id", (req, res) => {
  posts.get(req.params.id).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: "There was an error."
      });
    }
  );
});

app.delete("/posts/:id", (req, res) => {
  //disable all comments in the db
  // .then(post => comments.disableByParent(req.token, post))
  posts.disable(req.params.id).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: "There was an error."
      });
    }
  );
});

app.post("/posts/:id", (req, res) => {
  const { option } = req.body;
  const id = req.params.id;
  posts.vote(id, option).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: "There was an error."
      });
    }
  );
});

app.put("/posts/:id", (req, res) => {
  posts.edit(req.params.id, req.body).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: "There was an error."
      });
    }
  );
});

app.get("/posts/:id/comments", (req, res) => {
  comments.getByParent(req.token, req.params.id).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: "There was an error."
      });
    }
  );
});

app.get("/comments/:id", (req, res) => {
  comments.get(req.token, req.params.id).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: "There was an error."
      });
    }
  );
});

app.put("/comments/:id", (req, res) => {
  comments.edit(req.token, req.params.id, req.body).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: "There was an error."
      });
    }
  );
});

app.post("/comments", (req, res) => {
  comments.add(req.token, req.body).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: "There was an error."
      });
    }
  );
});

app.post("/comments/:id", (req, res) => {
  const { option } = req.body;
  comments.vote(req.token, req.params.id, option).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: "There was an error."
      });
    }
  );
});

app.delete("/comments/:id", (req, res) => {
  comments.disable(req.token, req.params.id).then(
    data => res.send(data),
    error => {
      console.error(error);
      res.status(500).send({
        error: "There was an error."
      });
    }
  );
});

app.listen(port, () => {
  console.log("Server listening on port %s, Ctrl+C to stop", port);
});
