const User = require("../models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const bcrypt = require("bcrypt");

function passportConfig() {
  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({ "_id": id }, (err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });


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

  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "/auth/twitter/callback"
  }, (token, tokenSecret, profile, done) => {
    User.findOne({ twitterId: profile.id }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        // @todo update user with twitterId: profile.id, $set: {token: ......}
        // and then done..
        return done(null, user);
      } else {
        const newUser = new User({
          twitterId: profile.id,
          token: token,
          tokenSecret: tokenSecret
        });

        newUser.save((err) => {
          if (err) {
            return done(err);
          }
          done(null, newUser);
        });
      }
    });
  }));
}


module.exports = {
  passportConfig
};
