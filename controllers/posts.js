const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true }
});
module.exports = mongoose.model("Post", PostSchema);


module.exports = app => {
    // CREATE
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

  
