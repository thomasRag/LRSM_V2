
const $ = window.$
/** ******** MAP FUNCTIONS ***********/
var L
var map = L.map('map', { zoomControl: false }).setView([45.5314, -73.6750], 11)
new L.Control.Zoom({ position: 'topright' }).addTo(map)
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
}).addTo(map)

var group = L.layerGroup()
var filteredGroup = L.layerGroup()
var mainMarkers

var setColor = {
  radius: 8,
  fillColor: getRandomColor(),
  color: '#ffffff',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.5
}

function getRandomColor () {
  var letters = '0123456789ABCDEF'.split('')
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15.66)]
  }
  return color
}

/** ******** END MAP FUNCTIONS ***********/

/**
* function that show the modal and close the popup
*/
function openModal () {
  $('#myModal').modal('show')
  map.closePopup()
}

/**
* function that revert back to the mainMarkers layer
*/
document.getElementById('modalClose').onclick = function () {
  getMainMarkers()
}

/**
* pan the popup to the center of the screen
*/

map.on('popupopen', function (e) {
            /** *** !! Auto Pan to the center of the popup ToolTip !! *****/
  var px = map.project(e.popup._latlng) // find the pixel location on the map where the popup anchor is
  px.y -= e.popup._container.clientHeight / 2 // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
  map.panTo(map.unproject(px), {animate: true}) // pan to new center
})

 /**
 * Generate list of values filtered on the map extent
 */

map.on('moveend ', function () {
  $('#arraySelectors').empty()
    // Construct an empty list to fill with onscreen markers.
  var inBounds = []
    // Get the map bounds - the top-left and bottom-right locations.
  var bounds = map.getBounds()

    // For each marker, consider whether it is currently visible by comparing
    // with the current map bounds.
  mainMarkers.eachLayer(function (marker) {
    if (bounds.contains(marker.getLatLng())) {
      inBounds.push(marker.feature.properties.story.id)
    }
  })

  for (var i = 0; i < inBounds.length; i++) {
    var liContainers = $('<li class="list-group-item col-md-12"></li>')
    var aContainers = $('<a href="#" class="text_info"></a>')
    aContainers.append(inBounds[i])
    liContainers.append(aContainers)
    $('#arraySelectors').append(liContainers)
  }
})

/**
* function that filter the mainMarkers layer on click
*/
var myFilterLayer
function getFilterMarkers (myFilterLayer) {
  filteredGroup.clearLayers()
  var filterMarkers = L.geoJSON(featuresCollection, {

        // filter for the specific id of the click main marker
    filter: function (feature, layer) {
      for (var j = 0; j < myFilterLayer; j++) {
        if (feature.properties.story['id'] === myFilterLayer) {
          console.log(feature.properties.story['id'], myFilterLayer)
          return true
        }
      }
    },

    pointToLayer: function (feature, latlng) {
      // var label = String(feature.properties.order)
      return L.circleMarker(latlng, setColor)// .bindTooltip(label, {permanent: true, opacity: 0.7}).openTooltip() //, style(feature)); //,styled(feature));
    },

          // on each feature call the modal and populate it with the specific related information gathered in the geojson
    onEachFeature: modalPopulate

  }).addTo(map)

  // Change container class in to outfocus if
  $('div#container').addClass('inFocus')

  // remove the main markers
  group.clearLayers()
  // add the filteredMarkers to the filteredGroup
  filteredGroup.addLayer(filterMarkers).addTo(map)
  // fit bounds of the filtered specifici markers
  map.fitBounds(filterMarkers.getBounds().pad(Math.sqrt(2) / 2))
}

/**
* function that display the main markers
*/

function getMainMarkers () {
       // Clear previously filtered markers
  filteredGroup.clearLayers()

  mainMarkers = L.geoJSON(featuresCollection, {
         // Filter properties main = true
    filter: function (feature, layer) {
      if (feature.properties.main === true) { return true }
    },
         // Display main markers as CircleMarkers
    pointToLayer: function (feature, latlng) {
      var label = String(feature.properties.story.id)
      return L.circleMarker(latlng, setColor).bindTooltip(label, {permanent: true, opacity: 0.7}).openTooltip()
    },

          // Call function onEachFeature1 (return)
    onEachFeature: onEachFeature

  })

  group.addLayer(mainMarkers).addTo(map)
  map.fitBounds(mainMarkers.getBounds())
}

getMainMarkers()

/**
* function that tell what to do on onEachFeature of the markers
*/

function onEachFeature (feature, layer) {
      // Create HTML POP UP //
  var customPopup = '<div id="popUp" class="card mb-3" style="max-width: 20rem;">  '
  customPopup = customPopup + '<div id="mediaHeader" class="card-header">'
  customPopup = customPopup + '<div id="textHeader" class="text-center"> <b>Multimedia</b> </div>'
  customPopup = customPopup + '</div> '
  customPopup = customPopup + '<div id="mediaIcon" class="">'
  customPopup = customPopup + '<img id="mediaIconImg" class="rounded-circle" src="img/Icon_Multimedia.png"  width="40px"/>'
  customPopup = customPopup + '</div>'
  customPopup = customPopup + '<a href="javascript:getFilterMarkers(' + feature.properties.story['id'] + '),openModal()"><img id="popUpImg" class="card-img-top" src="img/test.jpg" alt="Card image cap">'
  customPopup = customPopup + '<div id="popUpFooter" class="card-footer pl-1 mt-1 pt-1 mb-0 pb-0">'
  customPopup = customPopup + '<h5 id="popUpTitle" class="mt-0"> Titre du récit </h5>'
  customPopup = customPopup + '<p id="popUpAuthor" class="mt-1 pl-1 mb-0 pb-1">Nom de l\'auteur</p>'
  customPopup = customPopup + '</div></a>'
  customPopup = customPopup + '</div></div>'

      // specify popup class
  var customOptions =
          {'className': 'custom'}
      // bind html code and class options to the popup
  layer.bindPopup(customPopup, customOptions)// .on('click', function () {
    // console.log('test onclick')
};

/**
* function that tell what to do on onEachFeature of the filterMarkers and populate the modal
* @param {Object} feature
* @param {Object} layer
*/

function modalPopulate (feature, layer) {
    // CREATE DYNAMICALLY THE HTML CODE TO POPULATE THE MODAL SCROLL BY CHAPTER SECTION OF THE STORIES
    // / /////////////////////////////////////////////////////////////
  var chapter = $('<p></p><row chapter><div class="col-md-10"> <span id="elementNumber"> <h4>Élément #' + feature.properties.story['id'] +
            '   </h4> <span>       </div><div class="col-md-10"><span> <h5> Emplacement | Date </h5>  </span></div></div><div class="row"></div><div class="row">' +
            '<div class="col-md-10 mx-auto d-inline-block mt-2 pt-2 text-justify"><span> <p>  </p> </span> </div> </div><hr></div>',
    {
      text: feature.properties.story['id'],
      class: 'chapter-header'
    })

  var container = $('<div></div>', {
    id: 'container' + feature.properties['id'],
    class: 'image-container'
  })

  var description = $('<p></p>', {
    text: feature.properties['media_type'],
    class: 'description'
  })

// SCROLL BY CHAPTER
  var imageContainerMargin = 70  // Margin + padding

// SCROLL BY CHAPTER RELATED
  // This watches for the scrollable container
  $('div#modalBodyContent').scroll(function () {
    var scrollPosition = $(this).scrollTop()
  })

  // append the html code to the container itself
  container.append(chapter).append(description)
  $('#modalBodyContent').append(container)

  var i
  var areaTop = -100
  var areaBottom = 0

  // Calculating total height of blocks above active
  for (i = 1; i < feature.properties['id']; i++) {
    areaTop += $('div#container' + i).height() + imageContainerMargin
  }
  areaBottom = areaTop + $('div#container' + feature.properties['id']).height()

  // Check if the bloc (or chapter) is active by check its positions y in the container
  $('div#modalBodyContent').scroll(function () {
  // console.log(areaTop,areaBottom )
    if ($(this).scrollTop() >= areaBottom && $(this).scrollTop() < areaTop) {
  // add special class infocus for the active block (chapter)
      $('.image-container').removeClass('inFocus').addClass('outFocus')
      $('div#container' + feature.properties['id']).addClass('inFocus').removeClass('outFocus')
  // fly to the specific marker related to the chapter
      map.flyTo([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 18)
    }
  })

  // Click on a geometry = automaticly scroll to the right block (chapter)
  layer.on('click', function () {
    $('#modalBodyContent').animate({scrollTop: areaTop + 'px'})
  })
}
