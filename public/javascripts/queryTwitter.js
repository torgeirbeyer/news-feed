"use strict";

function getTwitterApiInfo(place) {
  /* axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`
    )
    .then(response => console.log(response))
    .catch(error => console.log(error)); */
};

/* const getQuery = document.getElementById("pac-input");
getQuery.addEventListener("click", () => {
  const city = document.getElementById("pac-input").value;
  getTwitterApiInfo(city);
}); */


searchBox.addListener("places_changed", () => {
  const places = searchBox.getPlaces();

  if (places.length === 0) {
    return;
  } else {
    getTwitterApiInfo(places);
  }
});