var fs = require("fs");
var express = require("express");
var ejs = require("ejs");
var bodyParser = require("body-parser");
var func = require("./control/func");
var bcrypt = require('bcrypt');
var app = express();

//Static files and engine ⛔⛔⛔
app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(bodyParser.urlencoded({ extended: true }));

// Dynamic controller GET,POST 📧📧📧
// Home page .
app.get("/", (req, res) => {
  res.render("index", {
    pageTitle: "Home"
  });
});

//Profile page 👱👱
app.get("/profile/:name", (req, res) => {
  var data = {
    hobbies: ["football", "basketball", "eating", "sleep", "coding"]
  };
  res.render("profile", {
    pageTitle: "profile",
    person: req.params.name,
    data
  });
});

//Contact page ☎ ☎
app.get("/contact", (req, res) => {
  res.render("contact", {
    pageTitle: "contact"
  });
});

//Login page 🎫🎫
app.get("/login", function(req, res) {
  res.render("login", {
    pageTitle: "login"
  });
});

app.post("/login", urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  // To read file content
  var read = fs.readFileSync("data.json", "utf8");
  if (read === "" || read === undefined) {
    // Check if array exist in json file
    read = Array.from([]);
    fs.writeFileSync("data.json", []);
    var data = read;
  } else {
    // Array exist and convert json to opjects
    var data = Array.from(JSON.parse(read));
    // Check if user is exist depending on username and department
    func.ifExist(data,req.body);
  }
  bcrypt.hash(req.body.password, 12, function(err, hash) {
    if(err){
      console.log(err);
      return err;
    }else{
      console.log(hash)
      req.body.password = hash;
      console.log('pass => '+req.body.password);
      return hash
    }
  });
  console.log(req.body.password);
  // Store new data in json file
  fs.writeFile("data.json", JSON.stringify(data), function(err) {
    if (err) throw err;
    console.log("Updated!");
  });
  res.render('contact-success',{
    pageTitle:'Successful',
    data:req.body
  })
});

//Check page
app.get("/check", function(req, res) {
  res.render("check", {
    pageTitle: "Checky page"
  });
});

//Check account allowed to sign in or not
app.post("/check", urlencodedParser, function(req, res, next) {
  if (!req.body) return res.sendStatus(400);
  var read = fs.readFileSync("data.json", "utf8");
  var data = JSON.parse(read);
  func.ifExist(data,req.body);
  next();
});
app.listen(2020, () => {
  console.log("server work in port 2020");
});