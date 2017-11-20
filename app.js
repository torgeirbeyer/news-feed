"use strict";

// -- REQUIRE DEPENDENCIES
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const MongoStore = require("connect-mongo")(session);
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");

const User = require("./models/user");

// -- REQUIRE MODELS
const index = require("./routes/index");
const auth = require("./routes/auth");

// -- SETUP APP
const app = express();

// -- CONNECT TO DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/news-feed", {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

// -- MIDDLEWARES -- //

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

// -- PASSPORT SETUP
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({ "_id": id }, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(flash());
// -- LocalStrategy
passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
},
(req, username, password, next) => {
  User.findOne({ email: username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: ("Incorrect email or password") });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: ("Incorrect email or password") });
    }

    return next(null, user);
  });
}));

app.use(passport.initialize());
app.use(passport.session());

// -- VIEWS
app.use(expressLayouts);
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
app.use("/auth", auth);

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
