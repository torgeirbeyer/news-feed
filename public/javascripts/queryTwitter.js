"use strict";

// function getTwitterApiInfo(place) {
//   /* axios
//     .get(
//       `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`
//     )
//     .then(response => console.log(response))
//     .catch(error => console.log(error)); */
// };

// /* const getQuery = document.getElementById("pac-input");
// getQuery.addEventListener("click", () => {
//   const city = document.getElementById("pac-input").value;
//   getTwitterApiInfo(city);
// }); */

const searchBox = document.getElementById("pac-input");

searchBox.addEventListener("submit", () => {
  const myForm = document.getElementById("myform");
  myForm.submit();
  console.log("moved");
  // const places = searchBox.getPlaces();

  if (places.length === 0) {

  } else {
    getTwitterApiInfo(places);
  }
});
