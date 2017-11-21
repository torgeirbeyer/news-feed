"use strict";

const R = require("request");
const Buffer = require("buffer").Buffer;
require("dotenv").config();

const key = process.env.TWITTER_CONSUMER_KEY;
const secret = process.env.TWITTER_CONSUMER_SECRET;
const cat = key + ":" + secret;
const credentials = new Buffer(cat).toString("base64");
const url = "https://api.twitter.com/oauth2/token";


function requestToken(cb) {
  R({ url: url,
    method: "POST",
    headers: {
      "Authorization": "Basic " + credentials,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: "grant_type=client_credentials"

  }, cb);
}

module.exports = {
  requestToken
};



