"use strict";

function insertListItem(tweet) {
  const element = document.createElement("ul");

  // list;
}

function createTweets(response) {
  const tweets = response.data.results;
  const body = document.body;
  const container = document.createElement("div");
  body.appendChild(container);
  container.setAttribute("class", "tweets");
  const list = document.createElement("ul");
  list.setAttribute("class", "tweets-list");
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
    .then(response => console.log(JSON.stringify(response, null, 2)))
    .catch(error => console.log(error));
}

// /* const getQuery = document.getElementById("pac-input");
// getQuery.addEventListener("click", () => {
//   const city = document.getElementById("pac-input").value;
//   getTwitterApiInfo(city);
// }); */
