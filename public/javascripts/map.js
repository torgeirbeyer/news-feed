function main() {
  let map;
  let markers = [];

  function startMap() {
    // CREATE MAP
    let userLocation;
    const mapOptions = {
      zoom: 15,
      center: userLocation
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

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
        // if not granted location
        function() {
          map = new google.maps.Map(document.getElementById("map"), {
            zoom: 6,
            center: {lat: 41, lng: 2}
          }
          );
          initializeSearch();
        }
      );
      // if browser not geolocation compatible
    } else {
      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: {lat: 41, lng: 2}
      }
      );
      initializeSearch();
    }
  }

  function initializeSearch() {
  // CREATE SEARCH INPUT
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP].push(input);

    map.addListener("bounds_changed", function() {
      searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener("places_changed", function() {
      const places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }
      markers.forEach(function(marker) {
        marker.setMap(null);
        // const latLng = marker.getPosition();
        // console.log(latLng);
      });


      markers = [];

      const bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }

        markers.push(
          new google.maps.Marker({
            map: map,
            title: place.name,
            position: place.geometry.location
          })
        );



        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };

        document.getElementById("user-lat").value = newLocation.lat;
        document.getElementById("user-lng").value = newLocation.lng;

        // Submit info from forms to the back-end
        const latLong = document.getElementById("myform");
        // const searchInput = document.getElementById("search-input");
        latLong.submit();
        // searchInput.submit();

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

  // function initGeoLocation() {
  // GET POSITION FROM IP

  // }
  startMap();
  initializeSearch();
  // initGeoLocation();
}

window.addEventListener("load", main);
