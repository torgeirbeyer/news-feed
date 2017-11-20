function main() {
  let map;
  function startMap() {
    // CREATE MAP
    const earth = {
      lat: 0,
      lng: 0
    };
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: earth
    });
  }

  function initializeSearch() {
  // CREATE SEARCH INPUT
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener("bounds_changed", function() {
      searchBox.setBounds(map.getBounds());
    });

    let markers = [];
    searchBox.addListener("places_changed", function() {
      const places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      const bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        markers.push(
          new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          })
        );

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

  function initGeoLocation() {
  // GET POSITION FROM IP
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
          const userMarker = new google.maps.Marker({
            position: {
              lat: userLocation.lat,
              lng: userLocation.lng
            },
            map: map,
            title: "You are here"
          });
        },
        function() {
          console.log("Error in the geolocation service.");
        }
      );
    } else {
      console.log("Browser does not support geolocation.");
    }
  }
  startMap();
  initializeSearch();
  initGeoLocation();
}

window.addEventListener("load", main);
