const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const Post = require('../models/post');
require('./controllers/posts.js')(app);
require('./data/reddit-db');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
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

};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

