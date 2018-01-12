var bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose       = require("mongoose"),
    express        = require("express"),
    Post           = require("./models/post"),
    app = express();

mongoose.connect("mongodb://localhost/personal-blog", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
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
  res.render("index");
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



app.listen(3000);