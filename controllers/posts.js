const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true }
});
module.exports = mongoose.model("Post", PostSchema);
const Post = require('../models/post');


module.exports = (app) => {

  // CREATE
  app.post('/posts/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });

  app.get('/', (req, res) => {
    Post.find({}).lean()
      .then(posts => {
        res.render('posts-index', { posts });
      })
      .catch(err => {
        console.log(err.message);
      })
  })
  app.get("/posts/:id", function(req, res) {
    // LOOK UP THE POST
    Post.findById(req.params.id).lean()
      .then(post => {
        res.render("posts-show", { post });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

};
  
// test/posts.js
const app = require("./../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

// Import the Post model from our models folder so we
// we can use it in our tests.
const Post = require('../models/post');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Posts', function() {
  const agent = chai.request.agent(server);
  // Post that we'll use for testing purposes
  const newPost = {
      title: 'post title',
      url: 'https://www.google.com',
      summary: 'post summary'
  };
  it("should create with valid attributes at POST /posts/new", function (done) {
    // TODO: test code goes here!
  });
});