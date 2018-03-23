var bodyParser       = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride   = require("method-override"),
    mongoose         = require("mongoose"),
    express          = require("express"),
    dotenv           = require("dotenv").config(),
    LocalStrategy    = require("passport-local"),
    passport         = require("passport"),
    //passportLocalMongoose = require("passport-local-mongoose"),
    session          = require("express-session"),
    MongoDBStore     = require("connect-mongodb-session")(session),
    Post             = require("./models/post"),
    User             = require("./models/user"),
    app              = express();

//Requiring Routes
var postRoutes       = require("./routes/posts"),
    indexRoutes      = require("./routes/index");

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
  cookie: {
        maxAge: 86400000 // 24 hours
      },
  store: store,
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

app.use(indexRoutes);
app.use(postRoutes);

// User.register(new User({username: "Christopher"}), process.env.C_USER_PASSWORD, function(err, user){
//   if(err){
//     console.log(err);
//   }else{
//     passport.authenticate("local")(function(){
//       console.log("added user");
//     }); 
//   }
// });

app.listen(3000);