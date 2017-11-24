"use strict";

function main() {
  let map;
  let markers = [];
  let tweetMarkers = [];
  let city = "Barcelona"; // default value for when map loads 1st time
  const pin = {
    url: "https://camo.githubusercontent.com/e8783c1b9fc99532bedbab3b8df9ce1b03d6f70b/68747470733a2f2f7777772e6272696172636c6966662e6564752f6d656469612f3339343033372f6d61726b65722e706e67",
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(30, 30)
  };


  // -- ADDING MARKERS FOR EACH TWEET
  function addTweetMarker(lat, lng) {
    for (let ix = 0; ix < tweetsTotal; ix++) {
      tweetMarkers.push(
        new google.maps.Marker({
          position: {
            lat: lat + ((Math.random() - 0.5) / 10),
            lng: lng + ((Math.random() - 0.5) / 10)
          },
          map: map,
          icon: pin
        })
      );
    }
  }


  function startMap() {
    // STYLE MAP
    const styledMap = new google.maps.StyledMapType(
      [
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "weight": 1.5
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.neighborhood",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.local",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
      ]
    );
    // CREATE MAP
    let userLocation;
    const mapOptions = {
      zoom: 11,
      center: userLocation,
      disableDefaultUI: true,
      zoomControl: true
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    map.mapTypes.set("styled_map", styledMap);
    map.setMapTypeId("styled_map");

    // GET USER LOCATION
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          getTwitterApiInfo(userLocation.lat, userLocation.lng, city, addTweetMarker);
          // addTweetMarker(userLocation.lat, userLocation.lng);



          // Center map with user location
          map.setCenter(userLocation);

          // Add a marker for your user location
          markers.push(
            new google.maps.Marker({
              position: {
                lat: userLocation.lat,
                lng: userLocation.lng
              },
              map: map,
              icon: pin
            }));

          const userMarker = markers[0];
          document.getElementById("user-lat").value = userMarker.position.lat();
          document.getElementById("user-lng").value = userMarker.position.lng();
          // console.log(userMarker.position.lat());
        },
        // if not granted access to location
        function() {
          map = new google.maps.Map(document.getElementById("map"), {
            zoom: 6,
            center: {lat: 41, lng: 2},
            disableDefaultUI: true,
            zoomControl: true
          }
          );
        }
      );
      // if browser not geolocation compatible
    } else {
      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: {lat: 41, lng: 2},
        disableDefaultUI: true,
        zoomControl: true
      }
      );
    }
    initializeSearch();
  }

  function initializeSearch() {
  // CREATE SEARCH INPUT
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP].push(input);

    map.addListener("bounds_changed", function() {
      searchBox.setBounds(map.getBounds());
    });

    // -- LISTENER ON SEARCH INPUT --
    searchBox.addListener("places_changed", function() {
      const places = searchBox.getPlaces();
      city = places[0].address_components[0].long_name;
      if (places.length === 0) {
        return;
      }

      // -- CLEAR USER LOCATION MARKERS
      markers.forEach((marker) => {
        marker.setMap(null);
      });


      markers = [];

      const bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          // console.log("Returned place contains no geometry");
          return;
        }

        // -- FINDING THE NEW LOCATION OF THE USER
        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };

        // -- ADDING NEW MARKER TO USERLOCATION
        // markers.push(
        //   new google.maps.Marker({
        //     map: map,
        //     title: place.name,
        //     position: newLocation
        //   })
        // );

        // -- REMOVE ALL TWEET MARKERS ON NEW SEARCH
        tweetMarkers.forEach((tweetMarker) => {
          tweetMarker.setMap(null);
        });

        tweetMarkers = [];

        // -- TO ADD NEW TWEETMARKERS
        // @todo find out how to call this the with the same length as the tweets received
        // function addTweetMarker() {
        //   tweetMarkers.push(
        //     new google.maps.Marker({
        //       position: {
        //         lat: newLocation.lat + ((Math.random() - 0.5) / 10),
        //         lng: newLocation.lng + ((Math.random() - 0.5) / 10)
        //       },
        //       map: map
        //     })
        //   );
        // }
        document.getElementById("user-lat").value = newLocation.lat;
        document.getElementById("user-lng").value = newLocation.lng;

        // -- ADDING TWEETS TO FRONTEND
        getTwitterApiInfo(newLocation.lat, newLocation.lng, city, addTweetMarker);
        // for (let ix = 0; ix < tweetsTotal; ix++) {
        // addTweetMarker(newLocation.lat, newLocation.lng);
        // }
        // console.log(place);

        /* // Submit info from forms to the back-end
        const latLong = document.getElementById("myform");
        // const searchInput = document.getElementById("search-input");
        latLong.submit();
        // searchInput.submit(); */


        // -- DONT REALLY KNOW WHAT THIS DOES
        if (place.geometry.viewport) {
        // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }

  startMap();
}

window.addEventListener("load", main);
