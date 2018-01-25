var bodyParser       = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride   = require("method-override"),
    mongoose         = require("mongoose"),
    express          = require("express"),
    Post             = require("./models/post"),
    app              = express();

mongoose.connect("mongodb://localhost/personal-blog", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// var data = [
//   {
//     name: "Laura",
//     title: "First Post",
//     entry: "This is my first post!!!!",
//   },
//   {
//     name: "Laura",
//     title: "Second Post",
//     entry: "More stuff to post! Yaya!"
//   },
//   {
//     name: "Chris",
//     title: "New Poster",
//     entry: "I have stuff to post, too!!!!!!!!"
//   },
// ];

app.get("/", function(req, res){
  res.redirect("posts");
});

// Index - show all posts
app.get("/posts", function(req, res){
  Post.find({}, function(err, posts){
    if(err){
      console.log(err);
    }else{
      res.render("posts", {posts: posts});
    }
  });
});

// New - Show new post form
app.get("/posts/new", function(req, res){
  res.render("new");
});

// Create - add new post
app.post("/posts", function(req, res){
  req.body.entry = req.sanitize(req.body.entry);
  var title = req.body.title;
  var entry = req.body.entry;
  var author = req.body.name;

  var newPost = {
    title: title,
    entry: entry,
    author: author,
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
app.get("/posts/:id", function(req, res){
  Post.findById(req.params.id, function(err, foundPost){
    if(err || !foundPost){
      res.redirect("back");
    }else{
      res.render("show",  {post: foundPost});
    }
  });
});

// Edit - show edit form for one particular post
app.get("/posts/:id/edit", function(req, res){
  Post.findById(req.params.id, req.body.entry, function(err, foundPost){
    res.render("edit", {post: foundPost});
  });
});

// Update - update selected post, then redirect
app.put("/posts/:id", function(req, res){
  req.body.post.entry = req.sanitize(req.body.post.entry);
  Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
    if(err){
      res.redirect("/posts");
    }else{
      res.redirect("/posts/" + req.params.id);
    }
  });
});

// Destroy - delete selected post, then redirect
app.delete("/posts/:id", function(req, res){
  Post.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/posts");
    }else{
      res.redirect("/posts");
    }
  });
});

app.listen(3000);