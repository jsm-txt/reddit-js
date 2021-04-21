// imports
const express = require('express')
const handlebars = require('handlebars')
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
require('./data/reddit-db');
// server 
const app = express()
require('./controllers/comments.js')(app);
//middle ware
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(expressValidator());
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// controllers 
require('./controllers/posts.js')(app)
// routes
app.get('/', (req, res) => {
    res.render('head')
})
app.get('/posts/new', (req,res) => {
    res.render('posts-new')
})
const Post = require('../models/post');
const Comment = require('../models/comment');

// CREATE Comment
app.post("/posts/:postId/comments", function(req, res) {
  // INSTANTIATE INSTANCE OF MODEL
  const comment = new Comment(req.body);

  // SAVE INSTANCE OF Comment MODEL TO DB
  comment
    .save()
    .then(comment => {
      return Post.findById(req.params.postId);
    })
    .then(post => {
      post.comments.unshift(comment);
      return post.save();
    })
    .then(post => {
      res.redirect(`/`);
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(3000)
module.exports = app;