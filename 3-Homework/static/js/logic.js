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
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    accessToken: API_KEY
  }).addTo(myMap);
  


 ///////////////////////////////////////////////////////////////////////////////////////////// 
  // Store API query variables
  var url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2004-12-26&endtime=2004-12-27&minmagnitude=1";
  
  // Grab the data with d3
  d3.json(url).then(function(response) {
  console.log(response.features[1].geometry.coordinates)
  var geoJson = L.geoJson(response).addTo(myMap)
    // Create a new marker cluster group
 //  var markers = L.markerClusterGroup();
  
 /*
    // Loop through data
    for (var i = 0; i < response.length; i++) {
      coordinates_of = response.features[i].geometry.coordinates  
      // Set the data location property to a variable
//      
      // Check for location property
      if (response) {
  
        // Add a new marker to the cluster group and bind a pop-up
        L.marker(coordinates_of[1],coordinates_of[0])
          .bindPopup(coordinates_of[i]).addTo(myMap);
      }
  
   // }
    }
    */
    // Add our marker cluster layer to the map
 //   myMap.addLayer(markers);
  
  });
  
  var circle = L.circle(geoJson, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);





















/*
function createMap(usgsData) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY
    });
  
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lightmap
    };
  
    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
      "Bike Stations": usgsData
    };
  
    // Create the map object with options
    var map = L.map("map-id", {
      center: [47.6098, -122.3390],
      zoom: 12,
      layers: [lightmap, usgsData]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  
// Grab the data with d3
d3.json("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2004-12-26&endtime=2004-12-27&minmagnitude=1").then(function(response) {

    // Create a new marker cluster group
    var markers = L.markerClusterGroup();
  
    // Loop through data
    for (var i = 0; i < response.length; i++) {
  
      // Set the data location property to a variable
      var location = response[i].location;
  
      // Check for location property
      if (location) {
  
        // Add a new marker to the cluster group and bind a pop-up
        markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
          .bindPopup(response[i].descriptor));
      }
  
    }
  
    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
  
  });
  
/*

  function createMarkers(quake) {
  
    // Pull the "stations" property off of response.data
    
  
    // Loop through data
    for (var i = 0; i < coordinates.length; i++) {
  
        // Set the data location property to a variable
        var coordinates = quake.metadata.features[i].geometry.coordinates;
    
        // Check for location property
        if (coordinates) {
    
          // Add a new marker to the cluster group and bind a pop-up
          markers.addLayer(L.marker(coordinates[1], coordinates.coordinates[0])
            .bindPopup(quake[i]));
        }
    
      }
  
    
    // Create a layer group made from the bike markers array, pass it into the createMap function
 //   createMap(L.layerGroup(coordinates));
  }
 */ 
  /*
  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  d3.json("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2004-12-26&endtime=2004-12-27&minmagnitude=1").then(createMarkers);
  */