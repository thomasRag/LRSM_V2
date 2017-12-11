
/**
* function that display the authors markers in the authors.html page
*/
var authorsfileredGroup = L.layerGroup()
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

 //filter for the specific id of the click main marker
    filter: function (feature, layer) {
        if (feature.geometry.type === "Point") {
                   return true
      }
    },

    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng)
    },

    onEachFeature : function(feature,layer){

      layer.on('click', function (e) {
        map.setView(e.latlng, 12)
      })
    }


})

  //authorsGroup.addLayer(authorsMarkers).addTo(map)
  markerCluster.addLayer(authorsMarkers).addTo(map).on('click');// add the filteredMarkers to the filteredGroup
  map.fitBounds(authorsMarkers.getBounds())
}



function zoomToAuthor(authorName) {
  authorsMarkers.eachLayer(function (layer) {
    if (layer.feature.properties.author.name === authorName) {

    }
  })
}

var getAuthorName =function(){
  $($(this)).click(function(el){
    var myAuthor =$(el.target).text()
      var text = ''
        text = myAuthor
          console.log(text)
    getFilterAuthorsByName(text)
  })
}

 var getFilterAuthorsByName = function(myName) {
   markerCluster.clearLayers()

  filteredAuthors = L.geoJSON(authorsFeaturesCollection, {

// filter for the specific id of the click main marker
    filter: function (feature, layer) {

      for (var j = 0; j < 1000; j++) {
        if (feature.properties.author.name === myName /*&& feature.geometry.type === "Point"*/) {
          return true

        }
      }
    },
    pointToLayer: function (feature, latlng) {
      //var label = String(feature.properties.author.name)
      return L.circleMarker(latlng)//.bindTooltip(label, {permanent: true, opacity: 0.7}).openTooltip() //, style(feature)); //,styled(feature));
    },
    onEachFeature : function(feature,layer){

      layer.on('click', function (e) {
        map.setView(e.latlng, 12)
      })
    }


  })

  authorsfileredGroup.addLayer(filteredAuthors).addTo(map)
  map.fitBounds(filteredAuthors.getBounds(),{maxZoom : 10})//.pad(Math.sqrt(2) / 2)) // fit bounds of the filtered specifici markers

}
