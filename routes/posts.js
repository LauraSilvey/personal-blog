var express = require("express"),
    router  = express.Router(),
    Post    = require("../models/post");

// Index - show all posts
router.get("/posts", function(req, res){
  Post.find({}, function(err, posts){
    if(err){
      console.log(err);
    }else{
      res.render("posts", {posts: posts});
    }
  });
});

// New - Show new post form
router.get("/posts/new", isLoggedIn, function(req, res){
  res.render("new");
});

// Create - add new post
router.post("/posts", isLoggedIn, function(req, res){
  //req.body.entry = req.sanitize(req.body.entry);
  var title = req.body.title;
  var entry = req.body.entry;
  var author = {
    id: req.user._id,
    username: req.user.username,
  };

  var newPost = {
    author: author,
    title: title,
    entry: entry,
  };
 
    console.log(newPost);
  Post.create(newPost, function(err, newEntry){
    if(err){
      console.log(err);
    }else{
      res.redirect("/posts");
    }
  });

});

// Show - show details for one particular post
router.get("/posts/:id", function(req, res){
  Post.findById(req.params.id, function(err, foundPost){
    if(err || !foundPost){
      res.redirect("back");
    }else{
      res.render("show",  {post: foundPost});
    }
  });
});

// Edit - show edit form for one particular post
router.get("/posts/:id/edit", function(req, res){
  Post.findById(req.params.id, req.body.entry, function(err, foundPost){
    res.render("edit", {post: foundPost});
  });
});

// Update - update selected post, then redirect
router.put("/posts/:id", function(req, res){
  //req.body.post.entry = req.sanitize(req.body.post.entry);
  Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
    if(err){
      res.redirect("/posts");
    }else{
      res.redirect("/posts/" + req.params.id);
    }
  });
});

// Destroy - delete selected post, then redirect
router.delete("/posts/:id", function(req, res){
  Post.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/posts");
    }else{
      res.redirect("/posts");
    }
  });
});

//middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}


module.exports = router;

