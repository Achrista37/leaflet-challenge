var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  mag_01: new L.LayerGroup(),
  mag_12: new L.LayerGroup(),
  mag_23: new L.LayerGroup(),
  mag_34: new L.LayerGroup(),
  mag_45: new L.LayerGroup(),
  mag_5up: new.L.LayerGroup
};

// Create the map with our layers
var map = L.map("map", {
  center: [40.73, -74.0059],
  zoom: 12,
  layers: [
    layers.mag_01,
    layers.mag_12,
    layers.mag_23,
    layers.mag_34,
    layers.mag_45,
    layers.mag_5up
  ]
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

var overlays = {
  "Magnitude 0-1": layers.mag_01,
  "Magnitude 1-2": layers.mag_12,
  "Magnitude 2-3": layers.mag_23,
  "Magnitude 3-4": layers.mag_34,
  "Magnitude 4-5": layers.mag_45,
  "Manitude 5++": layers.mag_5up
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);


// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};

// Add the info legend to the map
info.addTo(map);

// Initialize an object containing icons for each layer group
var icons = {
  mag_01: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "yellow",
    shape: "star"
  }),
  mag_12: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  }),
  mag_23: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "penta"
  }),
  mag_34: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "orange",
    shape: "circle"
  }),
  mag_45: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  }),
  mag_5up: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  })
};

var url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2004-12-26&endtime=2004-12-27&minmagnitude=1";


d3.json(url).then(function(earthquake_data) {
  
  /*
  var updatedAt = infoRes.last_updated;
    var stationStatus = statusRes.data.stations;
    var stationInfo = infoRes.data.stations;
*/


    // Create an object to keep of the number of markers in each layer
    var stationCount = {
      mag_01: 0,
      mag_12: 0,
      mag_23: 0,
      mag_34: 0,
      mag_45: 0,
      mag_5up: 0
    };

    // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
    var magnitudeCode;

    // Loop through the stations (they're the same size and have partially matching data)
    for (var i = 0; i < earthquake_data.length; i++) {
      var magnitude = response.features[0].properties.mag;
      // Create a new station object with properties of both station objects
      var station = Object.assign({}, stationInfo[i], stationStatus[i]);
      // If a station is listed but not installed, it's coming soon
      if (magnitude <= 1) {
        fillColor = green;
      }
      // If a station has no bikes available, it's empty
      else if (!station.num_bikes_available) {
        magnitudeCode = "EMPTY";
      }
      // If a station is installed but isn't renting, it's out of order
      else if (station.is_installed && !station.is_renting) {
        magnitudeCode = "OUT_OF_ORDER";
      }
      // If a station has less than 5 bikes, it's status is low
      else if (station.num_bikes_available < 5) {
        magnitudeCode = "LOW";
      }
      // Otherwise the station is normal
      else {
        magnitudeCode = "NORMAL";
      }

      // Update the station count
      stationCount[magnitudeCode]++;
      // Create a new marker with the appropriate icon and coordinates
      var newMarker = L.marker([station.lat, station.lon], {
        icon: icons[magnitudeCode]
      });

      // Add the new marker to the appropriate layer
      newMarker.addTo(layers[magnitudeCode]);

      // Bind a popup to the marker that will  display on click. This will be rendered as HTML
      newMarker.bindPopup(station.name + "<br> Capacity: " + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
    }

    // Call the updateLegend function, which will... update the legend!
    updateLegend(updatedAt, stationCount);
  });
