// imports
const express = require('express')
const handlebars = require('handlebars')
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
require('./data/reddit-db');
// server 
const app = express()
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
app.listen(3000)