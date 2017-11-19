"use strict";

// -- REQUIRE DEPENDENCIES
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const expressLaoyts = require("express-ejs-layouts");
const MongoStore = require("connect-mongo")(session);

// -- REQUIRE MODELS
const index = require("./routes/index");
const users = require("./routes/users");

// -- SETUP APP
const app = express();

// -- CONNECT TO DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/news-feed", {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

// -- SESSION SETUP
app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    }),
    secret: "some-string",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000
    }
  })
);

// -- VIEWS
app.use("expressLayouts");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layouts/main");

// --
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// -- ROUTES
app.use("/", index);
app.use("/users", users);

// -- ERROR HANDLER AND 404
// NOTE: requires a views/not-found.ejs template
app.use(function(req, res, next) {
  res.status(404);
  res.render("not-found");
});

// NOTE: requires a views/error.ejs template
app.use(function(err, req, res, next) {
  // always log the error
  console.error("ERROR", req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(err.status || 500);
    res.render("error");
  }
});

module.exports = app;
