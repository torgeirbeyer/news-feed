"use strict";

const Twitter = require("twitter");

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

function queryApi(userToken, userSecret, lat, lng, city, cb) {
  const key = process.env.TWITTER_CONSUMER_KEY;
  const secret = process.env.TWITTER_CONSUMER_SECRET;

  const client = new Twitter({
    consumer_key: key,
    consumer_secret: secret,
    access_token_key: userToken,
    access_token_secret: userSecret
  });

  const geocode = `${lat},${lng},10km`;
  const query = `%23BreakingNews+OR+%23${city}`;

  const params = {q: query, count: 10, geocode: geocode};
  client.get("search/tweets", params, (err, tweets, response) => {
    cb(err, tweets);
  });
}

function bearerQueryApi(accessToken, lat, lng, city, cb) {
  const key = process.env.TWITTER_CONSUMER_KEY;
  const secret = process.env.TWITTER_CONSUMER_SECRET;

  const client = new Twitter({
    consumer_key: key,
    consumer_secret: secret,
    accessToken: accessToken
  });

  const geocode = `${lat},${lng},10km`;
  const query = `%23BreakingNews+OR+%23${city}`;

  const params = {q: query, count: 10, geocode: geocode};
  client.get("search/tweets", params, (err, tweets, response) => {
    cb(err, tweets);
  });
}

module.exports = {
  queryApi: queryApi,
  bearerQueryApi: bearerQueryApi
};
