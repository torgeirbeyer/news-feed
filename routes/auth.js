"use strict";

const express = require("express");
const router = express.Router();
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");

const User = require("../models/user");

// -- LOGIN PAGE
router.get("/login", function(req, res, next) {
  res.render("auth/login", { errorMessage: req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

// -- SIGNUP PAGE
router.get("/signup", function(req, res, next) {
  res.render("auth/signup");
});

router.post("/signup", function(req, res, next) {
  const username = req.body.email;
  const password = req.body.password;
  if (username === "" || password === "") {
    res.render("auth/signup", {
      errorMessage: "Indicate an email and a password to sign up"
    });
    return;
  }

  User.findOne({email: username}, (err, email) => {
    if (err) {
      next(err);
    }
    if (email !== null) {
      res.render("auth/signup", {
        errorMessage: "This email already exists"
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const newUser = User({
      email: username,
      password: hashPass
    });
    newUser.save((err) => {
      if (err) {
        next(err);
      }
      req.login(newUser, () => {
        res.redirect("/");
      });
    });
  });
});

// -- LOGOUT
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("login");
});

module.exports = router;
