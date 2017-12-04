
const $ = window.$

/** ******** MAP FUNCTIONS ***********/
var L
var map = L.map('map', { zoomControl: false }).setView([45.5314, -73.6750], 8)
new L.Control.Zoom({ position: 'topright' }).addTo(map)
L.tileLayer('https://api.mapbox.com/styles/v1/clementg123/cjamwpz34e0ol2rlnix8smzuh/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2xlbWVudGcxMjMiLCJhIjoiY2o2M3ZhODh3MWxwNDJxbnJnaGZxcWNoMiJ9.YroDniTcealGFJgHtQ2hDg', {
  maxZoom: 22,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' +
  '&copy; <a href="https://carto.com/attribution">CARTO</a>'
}).addTo(map)

var group = L.layerGroup()
var filteredGroup = L.layerGroup()
var authorsGroup = L.layerGroup()
var projectsGroup = L.layerGroup()
var timeGroup = L.layerGroup()
var mobilityGroup = L.layerGroup()
var titleGroup = L.layerGroup()
var keyWordGroup = L.layerGroup()
var locationGroup = L.layerGroup()
var genreGroup = L.layerGroup()


var setColor = {
  radius: 8,
  fillColor: getRandomColor(),
  color: '#ffffff',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.5
}

$("#menuCarto").hover(function(){

    $('#submenuLRSM').addClass('d-none');
    $('#submenuCorpus').addClass('d-none');
    $('#submenuProjects').addClass('d-none');
    $('#submenuCarto').removeClass('d-none');
    $('#submenuCarto').addClass('d-block');

});
$("#menuProjets").hover(function(){
    $('#submenuLRSM').addClass('d-none');
    $('#submenuCorpus').addClass('d-none');
    $('#submenuCarto').addClass('d-none');
    $('#submenuProjects').removeClass('d-none');
    $('#submenuProjects').addClass('d-block');

});
$("#menuCorpora").hover(function(){

    $('#submenuLRSM').addClass('d-none');
    $('#submenuCarto').addClass('d-none');
    $('#submenuProjects').addClass('d-none');
    $('#submenuCorpus').removeClass('d-none');
    $('#submenuCorpus').addClass('d-block');

});
$("#menuLRSM").hover(function(){
    $('#submenuCorpus').addClass('d-none');
    $('#submenuCarto').addClass('d-none');
    $('#submenuProjects').addClass('d-none');
    $('#submenuLRSM').removeClass('d-none');
    $('#submenuLRSM').addClass('d-block');

});


function getRandomColor () {
  var letters = '0123456789ABCDEF'.split('')
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15.66)]
  }
  return color
}

function setGenreStyle() {
    for (var j = 0; j < group.length; j++) {
        (function (layer) {
            if (layer.feature.properties.story.media_links.media_type === 'pdf') {
                layer.feature.setStyle({fillColor: 'yellow'})
            }
            else if (layer.feature.properties.story.media_links.media_type === 'video') {
                layer.feature.setStyle({fillColor: 'red'})
            }
            else if (layer.feature.properties.story.media_links.media_type === 'audio') {
                layer.feature.setStyle({fillColor: 'teal'})
            }
            else if (layer.feature.properties.story.media_links.media_type === 'photo') {
                layer.feature.setStyle({fillColor: 'purple'})
            }
            else if (layer.feature.properties.story.media_links.media_type === 'multimedia') {
                layer.feature.setStyle({fillColor: 'green'})
            }
            else if (layer.feature.properties.story.media_links.media_type === 'dessin') {
                layer.feature.setStyle({fillColor: 'yellow'})
            }
            else if (layer.feature.properties.story.media_links.media_type === 'animation') {
                layer.feature.setStyle({fillColor: 'yellow'})
            }
        });
    }
}

/*

}*/

/** ******** END MAP FUNCTIONS ***********/

/** **************Buttons filter functions*******************/
$('.btn-rounded').click(function () {
  if ($(this).hasClass('btn-active')) {
    $(this).removeClass('btn-active')
  } else {
    $(this).addClass('btn-active')
  }
})

$(document).ready(function () {
  $('#hrefDate').click(function () {
    $('#dateRangeSliderModal').modal('toggle')
  })
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
    console.log(jsonFilter)
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
      inBounds.push(marker.feature.properties.story.title)
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
          //console.log(feature.properties.story['id'], myFilterLayer)
          return true
        }
      }
    },

    pointToLayer: function (feature, latlng) {
      //var label = String(feature.properties.order)
      return L.circleMarker(latlng, setColor)//.bindTooltip(label, {permanent: true, opacity: 0.7}).openTooltip() //, style(feature)); //,styled(feature));
    },

// on each feature call the modal and populate it with the specific related information gathered in the geojson
    onEachFeature: modalPopulate

  }).addTo(map)

  $('#container').addClass('inFocus')// Change container class in to outfocus if

  group.clearLayers() // remove the main markers
  filteredGroup.addLayer(filterMarkers).addTo(map) // add the filteredMarkers to the filteredGroup
  map.fitBounds(filterMarkers.getBounds().pad(Math.sqrt(2) / 2)) // fit bounds of the filtered specifici markers
}

function style(feature){
  for(var i = 0; i < 5; i++) {
      var media_type = feature.properties.story.genres[0].label
      console.log(media_type)

      if (media_type === undefined)
          {
              return {
              radius: 8,
              fillColor: 'rgba(255,255,255,0',
              color: '#ffffff',
              weight: 1,
              opacity: 1,
              fillOpacity: 0.5
          }
      }
      else if (media_type === 0) {
          {
              return {
                  radius: 8,
                  fillColor: 'rgba(255,255,255,0)',
                  color: '#ffffff',
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.5
              }}
          }

      else if (media_type === 'pdf') {
          return {
              radius: 8,
              fillColor: 'green',
              color: '#ffffff',
              weight: 1,
              opacity: 1,
              fillOpacity: 0.5
          }
      }
      else if (media_type === 'video') {
          return {
              radius: 8,
              fillColor: 'red',
              color: '#ffffff',
              weight: 1,
              opacity: 1,
              fillOpacity: 0.5
          }
      }
      else if (media_type === 'audio') {
          return {
              radius: 8,
              fillColor: 'teal',
              color: '#ffffff',
              weight: 1,
              opacity: 1,
              fillOpacity: 0.5
          }
      }
      else if (media_type === 'photo') {
          return {
              radius: 8,
              fillColor: 'purple',
              color: '#ffffff',
              weight: 1,
              opacity: 1,
              fillOpacity: 0.5
          }
      }
      else if (media_type === 'Documentaire') {
          return {
              radius: 8,
              fillColor: 'yellow',
              color: '#ffffff',
              weight: 1,
              opacity: 1,
              fillOpacity: 0.5
          }
      }
      else if (media_type === 'dessin') {
          return {
              radius: 8,
              fillColor: 'yellow',
              color: '#ffffff',
              weight: 1,
              opacity: 1,
              fillOpacity: 0.5
          }
      }
      else if (media_type === 'animation') {
          return {
              radius: 8,
              fillColor: 'yellow',
              color: '#ffffff',
              weight: 1,
              opacity: 1,
              fillOpacity: 0.5
          }
      }
  }
}

/**
* function that display the main markers
*/
var mainmarkers
function getMainMarkers () {

  filteredGroup.clearLayers() // Clear previously filtered markers

  mainMarkers = L.geoJSON(featuresCollection, {

    filter: function (feature) {
      //console.log(feature)
      if (feature.properties.main === true) { return true }
    },
// Display main markers as CircleMarkers
    pointToLayer: function (feature, latlng) {
      //var label = String(feature.properties.story.id)
      return L.circleMarker(latlng,style(feature))
      //.bindTooltip(label, {permanent: true, opacity: 0.7}).openTooltip()
    },
    onEachFeature: onEachFeature
  })

  group.addLayer(mainMarkers).addTo(map)
  map.fitBounds(mainMarkers.getBounds())
}

$(getMainMarkers ())

/**
 * Functions that read the different arrays in the jsonFilter and return earch of the keys for the specific object.
 * @returns {string}
 */

function titleSearch(){
    if (jsonFilter.title[0].length === undefined){
        return false
    }
    for (var j = 0; j < jsonFilter.title[0].length; i++) {
        if (jsonFilter.title[0][j] === undefined){
            return false
        }
        else {

            return jsonFilter.title[0][j]
        }}
}

function authorsSearch(){
    if (jsonFilter.authors[0].length === undefined){
        return false
    }
    for (var j = 0; j < jsonFilter.authors[0].length; i++) {
      if (jsonFilter.authors[0][j] === undefined){
           return false
      }
      else {

        return jsonFilter.authors[0][j]
    }}
}

function genreSearch(){

    if (jsonFilter.story.genre.length === undefined){
        return false
    }
    else if (jsonFilter.story.genre.length === 0){
        return false
}
    for (var j = 0; j < jsonFilter.story.genre[0].length; i++) {
        if (jsonFilter.story.genre[0][j] === undefined){
            return false
        }
        else {

            return jsonFilter.story.genre[0][j]
        }}
}

function mobilitySearch(){
    if (jsonFilter.story.mobility[0].length === undefined){
        return false
    }
    for (var j = 0; j < jsonFilter.mobility[0].length; i++) {
        if (jsonFilter.story.mobility[0][j] === undefined){
            return false
        }
        else {

            return jsonFilter.story.mobility[0][j]
        }}
}


function getTitleMarkers () {

    var titleMarkers = L.geoJSON(featuresCollection, {

        filter: function (feature) {

            for (var i = 0; i < featuresCollection.features.length; i++) {
                //A finir author = boucle sur le nombre des title dans le récit (title pluriel)
                if (feature.properties.main === true
                    && feature.properties.story.title === titleSearch()
                )
                {
                    return true
                }}
        },
        pointToLayer: function (feature, latlng) {
            var label = String(feature.properties.story.title)
            return L.circleMarker(latlng, setColor).bindTooltip(label, {permanent: true, opacity: 0.7}).openTooltip() //, style(feature)); //,styled(feature));
        },
        onEachFeature: modalPopulate
    })
    group.clearLayers()
    titleGroup.addLayer(titleMarkers).addTo(map)
}

function getAuthorsMarkers () {

    var authorsMarkers = L.geoJSON(featuresCollection, {

        filter: function (feature) {

            for (var i = 0; i < featuresCollection.features.length; i++) {
                //A finir author = boucle sur le nombre des authors dans le récit (authors pluriel)
                if (feature.properties.main === true
                    && feature.properties.story.authors[0].label === authorsSearch()
                  )
                {
                    return true
                }}
            },
        pointToLayer: function (feature, latlng) {
            var label = String(feature.properties.story.authors[0].label)
            return L.circleMarker(latlng, setColor).bindTooltip(label, {permanent: true, opacity: 0.7}).openTooltip() //, style(feature)); //,styled(feature));
        },
        onEachFeature: modalPopulate
    })
    group.clearLayers()
    authorsGroup.addLayer(authorsMarkers).addTo(map)
}

function getGenreMarkers () {

    var genreMarkers = L.geoJSON(featuresCollection, {

        filter: function (feature) {

            for (var i = 0; i < featuresCollection.features.length; i++) {
                //A finir author = boucle sur le nombre des authors dans le récit (authors pluriel)
                if (feature.properties.main === true
                    && feature.properties.story.genres[0].label === genreSearch()
                )
                {
                    return true
                }}
        },
        pointToLayer: function (feature, latlng) {
            var label = String(feature.properties.story.genres[0].label)
            return L.circleMarker(latlng, setColor).bindTooltip(label, {permanent: true, opacity: 0.7}).openTooltip() //, style(feature)); //,styled(feature));
        },
        onEachFeature: modalPopulate
    })
    group.clearLayers()
    genreGroup.addLayer(genreMarkers).addTo(map)
}



function getMobiltyMarkers () {

    var mobiltyMarkers = L.geoJSON(featuresCollection, {

        filter: function (feature) {

            for (var i = 0; i < featuresCollection.features.length; i++) {
                //A finir author = boucle sur le nombre des authors dans le récit (authors pluriel)
                if (feature.properties.main === true
                    && feature.properties.story.mobiltys[0].label === mobiltySearch()
                )
                {
                    return true
                }}
        },

        pointToLayer: function (feature, latlng) {
            var label = String(feature.properties.story.mobiltys[0].label)
            return L.circleMarker(latlng, setColor).bindTooltip(label, {permanent: true, opacity: 0.7}).openTooltip() //, style(feature)); //,styled(feature));
        },
        onEachFeature: modalPopulate
    })
    group.clearLayers()
    mobiltyGroup.addLayer(mobiltyMarkers).addTo(map)
}

/*&& feature.properties.story.genres[0].label === genreParsing()
&& feature.properties.story.main_location.label === authorsParsing()
&& feature.properties.story.title === authorsParsing()
&& feature.properties.story.projects[0].label ===  authorsParsing()
&& feature.properties.mobitily === authorsParsing()*/
/*
                    && feature.properties.story.genres[0].label === 'Rosie Lanoue Deslandes')
                    && feature.properties.story.main_tag.label === 'Rosie Lanoue Deslandes')
                    && feature.properties.story.main_location.label === 'Rosie Lanoue Deslandes')
                    && feature.properties.story.title === 'Rosie Lanoue Deslandes')
                    && feature.properties.story.projects[0].label === 'Rosie Lanoue Deslandes')
                    && feature.properties.mobitily === 'Rosie Lanoue Deslandes')*/


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
    /**
     * On hover over the point show legend
     */

    layer.on('mouseover', function(){
        $('#legend').css("display","inline-block")
    });
    layer.on('mouseout', function () {
        $('#legend').css("display","none")
    });
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




