
/**
* function that display the authors markers in the authors.html page
*/

var markerCluster = L.markerClusterGroup({

  iconCreateFunction: function (cluster) {
    var markerCluster = cluster.getAllChildMarkers();
    var html = '<div class="circle">' + markerCluster.length + '</div>';
    return L.divIcon({html: html, className: 'mycluster', iconSize: L.point(25, 25)});
  },
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: true,
  zoomToBoundsOnClick: true,
  removeOutsideVisibleBounds: true
});

function getFilterMarkersByAuthors () {
  $('#carte-tab').addClass('disabled')
  $('#myTab a[href="#liste"]').tab('show');
  authorsGroup.clearLayers()
  group.clearLayers() // remove the main markers
  filteredGroup.clearLayers()// remove the filtered markers
  authorsMarkers = L.geoJSON(authorsFeaturesCollection, {

// filter for the specific id of the click main marker
    filter: function (feature, layer) {
        if (feature.geometry.type === "Point") {
                   return true
      }
    },

    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng)
    }


})

  //authorsGroup.addLayer(authorsMarkers).addTo(map)
  markerCluster.addLayer(authorsMarkers).addTo(map).on('click');// add the filteredMarkers to the filteredGroup
  map.fitBounds(authorsMarkers.getBounds())
}

$("#arraySelectors").click(function(e) {
  console.log(e.value)
})
