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

  const geocode = `${lat},${lng},10km`;

<<<<<<< HEAD
  const params = {q: "%23BreakingNews OR %23technews", geocode: geocode};
=======
  const params = {q: "%23BreakingNews", count: 10, geocode: geocode};
>>>>>>> bf0e8514e7e00dba3421da4f159ad3aaa083d30b
  client.get("search/tweets", params, (err, tweets, response) => {
    cb(err, tweets);
  });
}


module.exports = {
  queryApi
};
