var fs = require("fs");
var express = require("express");
var ejs = require("ejs");
var bodyParser = require("body-parser");
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
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

// Dynamic controller GET,POST 📧📧📧
// Home page .
app.get("/", (req, res) => {
  res.render("index", {
    pageTitle: "Home"
  });
});

//profile page 👱👱
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

//contact page ☎ ☎
app.get("/contact", (req, res) => {
  res.render("contact", {
    pageTitle: "contact"
  });
});

//login page 🎫🎫
app.get("/login", function(req, res) {
  res.render("login", {
    pageTitle: "login"
  });
});

app.post("/login", urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  // to read file content
  var read = fs.readFileSync("data.json", "utf8");
  if (read === "" || read === undefined) {
    // check if array exist in json file
    read = Array.from([]);
    fs.writeFileSync("data.json", []);
    var data = read;
  } else {
    // array exist and convert json to opjects
    var data = Array.from(JSON.parse(read));
  }
  // check if user is exist depending on username and department
  var exist = false;
  data.find(x => {
    if (
      x.username === req.body.username &&
      x.department === req.body.department
    ) {
      exist = true;
      return "exist";
    } else {
      return "not exsit";
    }
  });
  if (!exist) {
    data.push(req.body);
  } else {
    console.log("user already exist");
    return "exist";
  }
// store new data in jmson file 
  fs.writeFile("data.json", JSON.stringify(data), function(err) {
    if (err) throw err;
    console.log("Updated!");
  });
});

//check page
app.get("/check", function(req, res) {
  res.render("check", {
    pageTitle: "Checky page"
  });
});

//check account allowed to sign in or not
app.post("/check", urlencodedParser, function(req, res, next) {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  var read = fs.readFileSync("data.json", "utf8");
  var data = JSON.parse(read);
  data.find(x => {
    if (
      x.username === req.body.username &&
      x.department === req.body.department
    ) {
      console.log("success login .. user exist");
      return "exist";
    } else {
      console.log("Not exist ..");
      return "not exsit";
    }
  });
  next();
});
app.listen(4000, () => {
  console.log("server work in port 4000");
});