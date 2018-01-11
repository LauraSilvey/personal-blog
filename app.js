var bodyParser = require("body-parser"),
methodOverride = require("method-override"),
mongoose = require("mongoose"),
express = require("express"),
app = express();

//change 'boiler-plate' to name of app.
mongoose.connect("mongodb://localhost/boilerplate", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));



app.get("/", function(req, res){
  res.render("index");
});

app.listen(3000);