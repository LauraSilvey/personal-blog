var express   = require("express"),
    router    = express.Router(),
    passport  = require("passport"),
    User      = require("../models/user");

router.get("/", function(req, res){
  res.redirect("posts");
});

//Show login form
router.get("/login", function(req, res){ 
  res.render("login");
});

//handle login logic
router.post("/login", passport.authenticate("local", 
  {
    successRedirect: "/posts",
    failureRedirect: "/login", 
  }), function(req,res){
});

//Show logout form
router.get("/logout", function(req, res){
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

module.exports = router;