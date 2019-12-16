const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
const session = require("express-session");

const productsController = require("./controllers/products");
const usersController = require("./controllers/users.js");
const sessionsController = require("./controllers/sessions.js");

const db = mongoose.connection;
mongoURI = process.env.MONGOURI || "mongodb://localhost/michele_coffe";

mongoose.connect(mongoURI);

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function() {
  console.log("DB: Connected");
});

app.use(express.static("public"));

app.use(methodOverride("_method")); //
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(
  session({
    secret: "feedmeseymour", //some random string
    resave: false,
    saveUninitialized: false
  })
);

app.use("/products", productsController);
app.use("/users", usersController);
app.use("/sessions", sessionsController);

app.get("/", (req, res) => {
  res.redirect("/products");
});

app.get("/", (req, res) => {
  res.render("index.ejs", {
    currentUser: req.session.currentUser
  });
});

app.post("/articles", (req, res) => {
  req.body.author = req.session.currentUser.username;
  Article.create(req.body, (err, createdArticle) => {
    res.redirect("/articles");
  });
});

app.listen(3000);

console.log("I am listening for requests!!!");
