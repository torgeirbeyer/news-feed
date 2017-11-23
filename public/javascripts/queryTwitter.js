"use strict";

let tweetsTotal = null;

function insertListItem(tweet) {
  const element = document.createElement("li");
  element.innerHTML =
  `
  <h4>${tweet.user.name}</h4>
  <p>${tweet.text}</p>
  <p>${tweet.created_at}</p>
  <p>${tweet.lang}</p>
  `;

  return element;
}

function createTweets(response) {
  const tweets = response.data.results;
  const oldContainer = document.getElementsByClassName("tweets");
  const body = document.body;

  // remove any previous created twitter-container
  if (oldContainer[0] !== undefined) {
    body.removeChild(oldContainer[0]);
  }
  // create a new twitter container
  const container = document.createElement("div");
  body.appendChild(container);
  container.setAttribute("class", "tweets");

  // create unordered list
  const list = document.createElement("ul");
  list.setAttribute("class", "tweets-list");
  container.appendChild(list);

  // add list of tweets
  tweetsTotal = tweets.length;
  for (let ix = 0; ix < tweets.length; ix++) {
    list.appendChild(insertListItem(tweets[ix]));
  }
}

function getTwitterApiInfo(lat, lng) {
  axios
    .post("/", {
      lat: lat,
      lng: lng
    })
<<<<<<< HEAD
    .then(response => console.log(JSON.stringify(response, null, 2)))
=======
    .then(response => createTweets(response))
>>>>>>> cf25c1a6857bd29d23b73444d8df8496b3e70de3
    .catch(error => console.log(error));
}
