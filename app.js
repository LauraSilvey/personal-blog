var bodyParser       = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride   = require("method-override"),
    mongoose         = require("mongoose"),
    express          = require("express"),
    dotenv           = require('dotenv').config(),
    LocalStrategy    = require("passport-local"),
    passport         = require("passport"),
    passportLocalMongoose = require("passport-local-mongoose"),
    session          = require("express-session"),
    MongoDBStore     = require("connect-mongodb-session")(session),
    Post             = require("./models/post"),
    User             = require("./models/user"),
    app              = express();

mongoose.connect("mongodb://localhost/personal-blog", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));


//Passport Config
var store = new MongoDBStore(
  {
    uri: process.env.DATABASEURL,
    collection: process.env.COLLECTION_NAME  
  });

app.use(session({
  secret: process.env.SESSION_SECRET,
  // cookie: {
  //       maxAge: 86400000 // 24 hours
  //     },
  // store: store,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  
  // res.locals.error = req.flash("error");
  // res.locals.success = req.flash("success");
  next();
});

// User.register(new User({username: "Christopher"}), process.env.C_USER_PASSWORD, function(err, user){
//   if(err){
//     console.log(err);
//   }else{
//     passport.authenticate("local")(function(){
//       console.log("added user");
//     }); 
//   }
// });

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
app.get("/posts/new", isLoggedIn, function(req, res){
  res.render("new");
});

// Create - add new post
app.post("/posts", isLoggedIn, function(req, res){
  //req.body.entry = req.sanitize(req.body.entry);
  var title = req.body.title;
  var entry = req.body.entry;
  var author = req.body.author;

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


//Show login form
app.get("/login", function(req, res){ 
  res.render("login");
});

//handle login logic
app.post("/login", passport.authenticate("local", 
  {
    successRedirect: "/posts",
    failureRedirect: "/login", 
  }), function(req,res){
});

//Show logout form
app.get("/logout", function(req, res){
  req.logout();
  //req.flash("success", "Logged you out!");
  res.redirect("/posts");
});

//middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

app.listen(3000);