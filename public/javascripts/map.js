

function main() {
  let map;
  let markers = [];
  let tweetMarkers = [];


  // -- ADDING MARKERS FOR EACH TWEET
  function addTweetMarker(lat, lng) {
    for (let ix = 0; ix < tweetsTotal; ix++) {
      tweetMarkers.push(
        new google.maps.Marker({
          position: {
            lat: lat + ((Math.random() - 0.5) / 10),
            lng: lng + ((Math.random() - 0.5) / 10)
          },
          map: map
        })
      );
    }
  }


  function startMap() {
    // CREATE MAP
    let userLocation;
    const mapOptions = {
      zoom: 12,
      center: userLocation
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // GET USER LOCATION
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          getTwitterApiInfo(userLocation.lat, userLocation.lng, addTweetMarker);
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
              map: map
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
            center: {lat: 41, lng: 2}
          }
          );
        }
      );
      // if browser not geolocation compatible
    } else {
      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: {lat: 41, lng: 2}
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
        markers.push(
          new google.maps.Marker({
            map: map,
            title: place.name,
            position: newLocation
          })
        );

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
        getTwitterApiInfo(newLocation.lat, newLocation.lng, addTweetMarker);
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
