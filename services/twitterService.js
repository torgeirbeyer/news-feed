"use strict";

const Twitter = require("twitter");

function queryApi(userToken, userSecret, lat, lng, cb) {
  const key = process.env.TWITTER_CONSUMER_KEY;
  const secret = process.env.TWITTER_CONSUMER_SECRET;

  const client = new Twitter({
    consumer_key: key,
    consumer_secret: secret,
    access_token_key: userToken,
    access_token_secret: userSecret
  });

  const params = {screen_name: "nodejs"};
  client.get("statuses/user_timeline", params, (err, tweets, response) => {
    cb(err, tweets);
  });
}


module.exports = {
  queryApi
};
