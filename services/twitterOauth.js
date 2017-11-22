"use strict";

const R = require("request");
const Buffer = require("buffer").Buffer;
require("dotenv").config();

const key = process.env.TWITTER_CONSUMER_KEY;
const secret = process.env.TWITTER_CONSUMER_SECRET;
const cat = key + ":" + secret;
const credentials = new Buffer(cat).toString("base64");

function requestToken(cb) {
  const url = "https://api.twitter.com/oauth2/token";
  R({ url: url,
    method: "POST",
    headers: {
      "Authorization": "Basic " + credentials,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: "grant_type=client_credentials"

  }, cb);
}

function queryApi(accessToken) {
  const bearerToken = JSON.parse(accessToken).access_token;
  const url = "https://api.twitter.com/1.1/statuses/user_timeline.json?";
  R({ url: url,
    method: "GET",
    qs: {"screen_name": "lacazeto"},
    json: true,
    headers: {
      "Authorization": "Bearer " + bearerToken
    }

  }, function(err, resp, body) {
    if (err) {
      throw (err);
    }
    console.log(body);
  });
}

module.exports = {
  requestToken: requestToken,
  queryApi: queryApi
};



