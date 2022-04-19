//Get leaflet to generate a base map, with a center in Aceh, Indonesia
var myMap = L.map("map", {
  center: [4.695135, 96.749397],
  zoom: 3
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);



///////////////////////////////////////////////////////////////////////////////////////////// 
// Store API query variables
var url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2004-12-26&endtime=2004-12-27&minmagnitude=1";

// Grab the data with d3
d3.json(url).then(function (response) {
  console.log(response);
  console.log(response.features[0].properties.mag)

  //function to dynamically change color of the pointers
  function colorSelector(magData) {
    if (magData >= 5) {
      return '#F06B6B';
    }
    if (magData > 4) {
      return '#F0A76B';
    }

    if (magData > 3) {
      return '#F3B94D';
    }

    if (magData > 2) {
      return '#F3DA4D';
    }

    if (magData > 1) {
      return '#E0F34D';
    }
    else {
      return '#B7F34D'
    }
  }

  //function to dynamically change the size of the radius
  function radiusSelector(mag2Data) {
    if (mag2Data === 0) {
      return 1;
    }
    return mag2Data * 4;
  }
  
  //get Leaflet to handle geoJson data from the promise above
  L.geoJson(response, {

    style: function (feature) {
      return {
        color: 'transparent',
        fillColor: colorSelector(feature.properties.mag),
        fillOpacity: 0.5,
        radius: radiusSelector(feature.properties.mag),
      }
    },
    pointToLayer: function (feature, latlng) {
      
      return new L.CircleMarker(latlng);
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + " Location:" + feature.properties.place);
    }
  }).addTo(myMap);

  var legend = L.control({position: "bottomright"});
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");

var grades = [0, 1, 2, 3, 4, 5];
    var colors = [
      "#B7F34D",
      "#E0F34D",
      "#F3DA4D",
      "#F3B94D",
      "#F0A76B",
      "#F06B6B"];

    // Loop through our intervals and generate a label with a colored square for each interval.
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML += "<i style='background: "
        + colors[i]
        + "'></i> "
        + grades[i]
        + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }

    return div;
  };

  // We add our legend to the map.
  legend.addTo(map);





///////////////////////////////  
})