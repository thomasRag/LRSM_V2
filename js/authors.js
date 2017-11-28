
/**
* function that display the authors markers in the authors.html page
*/

function getFilterMarkersByAuthors () {
  authorsGroup.clearLayers()
  group.clearLayers() // remove the main markers
  filteredGroup.clearLayers()// remove the filtered markers
  authorsMarkers = L.geoJSON(featuresCollectionAuthors, {

/* filter for the specific id of the click main marker
    filter: function (feature, layer) {
      for (var j = 0; j < myFilterLayer; j++) {
        if (feature.properties.story.authors['id'] === myAuthorsLayerm) {
          console.log(feature.properties.story.authors['id'], myAuthorsLayer)
          return true
        }
      }
    },*/

    pointToLayer: function (feature, latlng) {
      var label = String(feature.properties.story.authors['id'])
      return L.circleMarker(latlng, setColor).bindTooltip(label, {permanent: true, opacity: 0.7}).openTooltip() //, style(feature)); //,styled(feature));
    }
}).addTo(map)

  authorsGroup.addLayer(authorsMarkers).addTo(map) // add the filteredMarkers to the filteredGroup
  map.fitBounds(filterMarkers.getBounds())
}



/**
* function that filters the authors markers in the authors.html page
*/

function getFilterMarkersByAuthorsId (authorsId) {
  authorsGroup.clearLayers()
  group.clearLayers() // remove the main markers
  filteredGroup.clearLayers()// remove the filtered markers
  authorsMarkers = L.geoJSON(featuresCollectionAuthors, {

 filter for the specific id of the click main marker
    filter: function (feature, layer) {
      for (var j = 0; j < myFilterLayer; j++) {
        if (feature.properties.story.authors['id'] === authorsId) {
          //console.log(feature.properties.story.authors['id'], authorsId)
          return true
        }
      }
    },

    pointToLayer: function (feature, latlng) {
      var label = String(feature.properties.story.authors['id'])
      return L.circleMarker(latlng, setColor).bindTooltip(label, {permanent: true, opacity: 0.7}).openTooltip() //, style(feature)); //,styled(feature));
    }
}).addTo(map)

  authorsGroup.addLayer(authorsMarkers).addTo(map) // add the filteredMarkers to the filteredGroup
  map.fitBounds(filterMarkers.getBounds().pad(Math.sqrt(2) / 2)) // fit bounds of the filtered specifici markers
}
