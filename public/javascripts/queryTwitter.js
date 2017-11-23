"use strict";

let tweetsTotal = null;

function insertListItem(tweet) {
  const element = document.createElement("li");
  // console.log(tweet);
  element.innerHTML =
  `
  <img src="${tweet.user.profile_image_url}">$
  <h4>${tweet.user.name}</h4>
  <p>${tweet.text}</p>
  <p>${tweet.created_at}</p>
  `;

  return element;
}

function createTweets(response) {
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

  const tweets = response.data.results;

  if (tweets.length >= 1) {
    // create unordered list
    const list = document.createElement("ul");
    list.setAttribute("class", "tweets-list");
    container.appendChild(list);

    // add list of tweets
    tweetsTotal = tweets.length;
    for (let ix = 0; ix < tweets.length; ix++) {
      list.appendChild(insertListItem(tweets[ix]));
    }
  } else {
    container.innerHTML = "<h2> No Tweets found at this location<h2>";
  }
}

function getTwitterApiInfo(lat, lng, city) {
  axios
    .post("/", {
      lat: lat,
      lng: lng,
      city: city
    })
    .then(response => createTweets(response))
    .catch(error => console.log(error));
}
