"use strict";

let tweetsTotal = null;
const body = document.body;

function displayNoSearch() {
  const container = document.createElement("div");
  body.appendChild(container);
  container.setAttribute("class", "tweets");
  container.innerHTML = "<h3 class='happening' >Try searching for a city</h3>";
}

function insertListItem(tweet) {
  const element = document.createElement("li");
  // console.log(tweet);
  element.innerHTML =
  `
  <div class="top-card">
    <img src="${tweet.user.profile_image_url}">
    <div>
      <h4>${tweet.user.name}</h4>
      <p class="date">${tweet.created_at}</p>
    </div>
  </div>
  <p class="text">${tweet.text}</p>
  `;

  return element;
}

function createTweets(response, cb, lat, lng, city) {
  const tweets = response.data.results;
  const oldContainer = document.getElementsByClassName("tweets");

  // remove any previous created twitter-container
  if (oldContainer[0] !== undefined) {
    body.removeChild(oldContainer[0]);
  }

  // create a new twitter container
  const container = document.createElement("div");
  body.appendChild(container);
  container.setAttribute("class", "tweets");
  container.innerHTML = `<h4 class="happening">Happening in ${city}</h4>`;

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
    container.innerHTML = "<h2 class='happening'> No Tweets found at this location<h2>";
  }
  cb(lat, lng);
}

function getTwitterApiInfo(lat, lng, city, cb) {
  axios
    .post("/", {
      lat: lat,
      lng: lng,
      city: city
    })
    .then(response => createTweets(response, cb, lat, lng, city))
    .catch(error => console.log(error));
}
