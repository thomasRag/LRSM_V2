
const $ = window.$
/** ******** MAP FUNCTIONS ***********/
var L
var map = L.map('map', { zoomControl: false }).setView([45.5314, -73.6750], 11)
new L.Control.Zoom({ position: 'topright' }).addTo(map)
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' +
  '&copy; <a href="https://carto.com/attribution">CARTO</a>'
}).addTo(map)

var group = L.layerGroup()
var filteredGroup = L.layerGroup()
var mainMarkers
var filteredMarkers

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

/****************Buttons filter functions*******************/
$(".btn-rounded").click(function(){
  if ($(this).hasClass("btn-active"))
    {
      $(this).removeClass("btn-active")
    }
    else {
      $(this).addClass("btn-active");
    }
});

$(document).ready(function(){
  $("#hrefDate").click(function(){
    $('#dateRangeSliderModal').modal('toggle')
  })
});



/**********************************************/
// Create a new date from a string, return as a timestamp.
function timeStamp(str){
    return new Date(str).getTime();
}
// Create a list of day and monthnames.
var	months = [
		"01", "02", "03",
		"04", "05", "06", "07",
		"08", "09", "10",
		"11", "12"
	];

// Create a string representation of the date.
function formatDate ( date ) {
    return date.getDate()  + "-" +
    //weekdays[date.getDay()] + ", " +

        months[date.getMonth()] + "-" +
        date.getFullYear();
}

function toFormat (v) {
    return formatDate(new Date(v));
}







$(document).ready(function(){
var dateSlider = document.getElementById('slider-date');
noUiSlider.create(dateSlider, {
// Create two timestamps to define a range.
    connect: true,
	  start: [ timeStamp('2017'), timeStamp('2018') ],
    range: {
		// Starting at 500, step the value by 500,
		// until 4000 is reached. From there, step by 1000.
		'min': timeStamp('0000'),
    '10%': [ timeStamp('2017'), 7 * 24 * 60 * 60 * 1000 ],
		'80%': [ timeStamp('2018'), 7 * 24 * 60 * 60 * 1000 ],
    'max': timeStamp('9999')
	},

// Steps of one week
    step:   7 * 24 * 60 * 60 * 1000,

// Two more timestamps indicate the handle starting positions.



    format: { to: toFormat, from: Number }

});


function sp( event ){ event.stopPropagation(); }

function makeTT ( i, slider ) {
	var tooltip = document.createElement('div'),
  		input = document.createElement('input');

	// Add the input to the tooltip
  tooltip.className = 'noUi-tooltip';
  tooltip.appendChild(input);

  // On change, set the slider
  input.addEventListener('change', function(){
  	var values = [];
    var toNumber = timeStamp(this.value)
    values[i] = toNumber
    slider.noUiSlider.set(values)
  });

  // Catch all selections and make sure they don't reach the handle
  input.addEventListener('mousedown', sp);
  input.addEventListener('touchstart', sp);
  input.addEventListener('pointerdown', sp);
  input.addEventListener('MSPointerDown', sp);

  // Find the lower/upper slider handle and insert the tooltip
  slider.querySelector(i ? '.noUi-handle-upper' : '.noUi-handle-lower').appendChild(tooltip);

  return input;
}

// An 0/1 indexed array of input elements
var tooltipInputs = [makeTT(0, dateSlider), makeTT(1, dateSlider)];

// When the slider changes, update the tooltip
dateSlider.noUiSlider.on('update', function(values, handle) {
   tooltipInputs[handle].value = values[handle];
});
})

/**********************************************/

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

  var inBounds = [] // Construct an empty list to fill with onscreen markers.

  var bounds = map.getBounds() // Get the map bounds - the top-left and bottom-right locations.

// For each marker, consider whether it is currently visible by comparing  with the current map bounds.
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
function getFilterMarkersById (myFilterLayer) {
  filteredGroup.clearLayers()
  filterMarkers = L.geoJSON(featuresCollection, {

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
      var label = String(feature.properties.order)
      return L.circleMarker(latlng, setColor).bindTooltip(label, {permanent: true, opacity: 0.7}).openTooltip() //, style(feature)); //,styled(feature));
    },

// on each feature call the modal and populate it with the specific related information gathered in the geojson
    onEachFeature: modalPopulate

  }).addTo(map)

  $('div#container').addClass('inFocus')// Change container class in to outfocus if

  group.clearLayers() // remove the main markers
  filteredGroup.addLayer(filterMarkers).addTo(map) // add the filteredMarkers to the filteredGroup
  map.fitBounds(filterMarkers.getBounds().pad(Math.sqrt(2) / 2)) // fit bounds of the filtered specifici markers
}


/**
* function that display the main markers
*/

function getMainMarkers () {
  filteredGroup.clearLayers() // Clear previously filtered markers

  mainMarkers = L.geoJSON(featuresCollection, {

    filter: function (feature, layer) {
      if (feature.properties.main === true) { return true }
    },
// Display main markers as CircleMarkers
    pointToLayer: function (feature, latlng) {
      var label = String(feature.properties.story.id)
      return L.circleMarker(latlng, setColor).bindTooltip(label, {permanent: true, opacity: 0.7}).openTooltip()
    },
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
  customPopup = customPopup + '<a href="javascript:getFilterMarkersById(' + feature.properties.story['id'] + '),openModal()"><img id="popUpImg" class="card-img-top" src="img/test.jpg" alt="Card image cap">'
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
  var chapter = $('<div class="col-md-11 chapter"><h4>Élément #' + feature.properties['order'] + ' </h4><hr></div>',
    {
      class: 'chapter-header'
    })

  var container = $('<section></section>', {
    id: feature.properties['order'],
    class: 'image-container'
  })

  var description = $('<div>' + feature.properties.story['text'] + '</div>', {
    class: 'description'
  })

  chapter.append(description)
  container.append(chapter)

  $('#modalBodyContent').append(container)
}

    /**
    * function that check for the container id and zoom to the parent feature
    * @param {numeric} newId
    */

var narrative = document.getElementById('modalBodyContent')
var sections = narrative.getElementsByTagName('section')
var currentId = ''

function setId (newId) {
          // If the ID hasn't actually changed, don't do anything
  if (newId === currentId) return
          // Otherwise, iterate through layers, setting the current
          // marker to a different color and zooming to it.
  filterMarkers.eachLayer(function (layer) {
    if (String(layer.feature.properties.order) === newId) {
      map.flyTo([layer.feature.geometry.coordinates[1], layer.feature.geometry.coordinates[0]], 18)
    }
  })
          // highlight the current section
  for (var i = 0; i < sections.length; i++) {
    sections[i].className = sections[i].id === newId ? 'active' : ''
  }
          // And then set the new id as the current one,
          // so that we know to do nothing at the beginning
          // of this function if it hasn't changed between calls
  currentId = newId
        //  console.log(currentId)
}
      // If you were to do this for real, you would want to use
      // something like underscore's _.debounce function to prevent this
      // call from firing constantly.
narrative.onscroll = function (e) {
  var narrativeHeight = narrative.offsetHeight
  var newId = currentId
          // Find the section that's currently scrolled-to.
          // We iterate backwards here so that we find the topmost one.
  for (var i = sections.length - 1; i >= 0; i--) {
            // console.log(sections.length)
    var rect = sections[i].getBoundingClientRect()
    if (rect.top >= 0 && rect.top <= narrativeHeight) {
      newId = sections[i].id
    }
  };
  setId(newId)
}
