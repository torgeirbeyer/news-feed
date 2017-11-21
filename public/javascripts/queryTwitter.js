"use strict";
<<<<<<< HEAD

// function getTwitterApiInfo(place) {
//   /* axios
//     .get(
//       `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`
//     )
//     .then(response => console.log(response))
//     .catch(error => console.log(error)); */
// };
=======
/* 
function getTwitterApiInfo(place) {
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`
    )
    .then(response => console.log(response))
    .catch(error => console.log(error));
}; */
>>>>>>> 9ea16bce0c967f7aa69cac34d1d9a880f76d4742

// /* const getQuery = document.getElementById("pac-input");
// getQuery.addEventListener("click", () => {
//   const city = document.getElementById("pac-input").value;
//   getTwitterApiInfo(city);
// }); */

<<<<<<< HEAD
const searchBox = document.getElementById("pac-input");

searchBox.addEventListener("submit", () => {
  const myForm = document.getElementById("myform");
  myForm.submit();
  console.log("moved");
  // const places = searchBox.getPlaces();

  if (places.length === 0) {
=======
console.log("blaa");

const searchBoxContainer = document.getElementById("pac-input");

searchBoxContainer.addListener("places_changed", () => {
  console.log("blee");
  const myForm = document.getElementById("myform");
  myForm.submit();
  const places = searchBoxContainer.getPlaces();
>>>>>>> 9ea16bce0c967f7aa69cac34d1d9a880f76d4742

/*   if (places.length === 0) {
    return;
  } else {
    getTwitterApiInfo(places);
  } */
});
