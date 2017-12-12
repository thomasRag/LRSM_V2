
const $ = window.$

/** ******** MAP FUNCTIONS ***********/
var L
var map = L.map('map', { zoomControl: false }).setView([45.5314, -73.6750], 8)
new L.Control.Zoom({ position: 'topright' }).addTo(map)
L.tileLayer('https://api.mapbox.com/styles/v1/clementg123/cjb338httt3cz2spo5i4hcrvh/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2xlbWVudGcxMjMiLCJhIjoiY2o2M3ZhODh3MWxwNDJxbnJnaGZxcWNoMiJ9.YroDniTcealGFJgHtQ2hDg', {
  maxZoom: 22
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
var allGroups = L.layerGroup()



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

/** **************Buttons filter functions*******************/



$(function(){

  $('#hrefDate').click(function () {
    $('#dateRangeSliderModal').modal('toggle')
  })
})

/**
 * function that listen to the Mobility buttons and push values to its specific array
 * @type {Array}
 */
$('.btn-rounded').click(function () {
  if ($(this).hasClass('btn-active')) {
    $(this).removeClass('btn-active')

   } else {
    $(this).addClass('btn-active')

  }
  getGenreMarkers()
})



/**********************************************/

/**
* function that show the panel and close the popup
*/
function openModal () {
  if ($("#recitInfoPanel").hasClass('modalInactive')){

    $("#recitInfoPanel").animate({left: "0px"},0)
    $("#recitInfoPanel").removeClass('modalActive')
    $("#map").width('55%')}
  else{

  $("#recitInfoPanel").animate({left: "-800px"},0)
  $("#recitInfoPanel").addClass('modalActive')
  $("#map").width('85%')}
  map.closePopup()
}
/**
 * function that dismiss the panel revert back to the  the popup
 */
function closeModal(){
  $('#panelCloseButton').click(function(){
    $('#articles').empty()
    $("#recitInfoPanel").animate({left: "-800px"})
    $("#recitInfoPanel").addClass('modalActive')
    getMainMarkers()
    $("#map").width('85%')}
  )
}
/**
* function that revert back to the mainMarkers layer
*/
//document.getElementById('modalClose').onclick = function () {
 // getMainMarkers()
//}

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

    if (map.hasLayer(mainMarkers)){
        // For each marker, consider whether it is currently visible by comparing  with the current map bounds.
        mainMarkers.eachLayer(function (marker) {
            if (bounds.contains(marker.getLatLng())) {
                inBounds.push(marker.feature.properties.story.title)
            }
        })
    }
    else if (map.hasLayer(markerCluster)){
      /* function that retrive unique objects from an array */

      markerCluster.eachLayer(function (marker) {
        if (bounds.contains(marker.getLatLng())) {
                inBounds.push(marker.feature.properties.author.name)

            }
        })
    }

  /**
   *
   * function that returns a array with unique values
   * @returns {*[array]}
   */
  Array.prototype.unique = function () {
    return this.filter(function (value, index, self) {
      return self.indexOf(value) === index
    })
  }

  var myInboundsList = inBounds.unique()
  /**
   * function that push the unique values into a new <a></a>
   * @returns {*[array]}
   */
  for (var i = 0; i < myInboundsList.length; i++) {
    var liContainers = $('<li id="" class="list-group-item col-md-12"></li>')
    var aContainers = $('<a href="javascript:getAuthorName()" class="text_info"><span id="'+i+'" class="text_info">'+myInboundsList[i]+'</span></a>')
    //var spanContainer =$('<button id="" class="text_info btn btn-default">'+myInboundsList[i]+'</button>')
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
  map.fitBounds(filterMarkers.getBounds(),{maxZoom:14})//.pad(Math.sqrt(2) / 2)) // fit bounds of the filtered specifici markers
}


function setCatStyle(feature) {
      if (feature.properties.story.category === 'dessin') {
        return 'orange'
      }
      else if (feature.properties.story.category === 'video') {
        return 'red'
      }
      else if (feature.properties.story.category === 'audio') {
        return 'turquoise'
      }
      else if (feature.properties.story.category === 'photo') {
        return  'purple'
      }
      else if (feature.properties.story.category === 'multimédia') {
        return 'yellow'
      }
      else if (feature.properties.story.category === 'écrit') {
       return 'lawngreen'
      }
      else {
        return 'white'
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

     var icon = new  L.icon.pulse({
       iconSize:[12,12],
       color: setCatStyle(feature),
       fillColor : setCatStyle(feature) ,
       fillOpacity: 0.5,
       heartbeat:Math.floor(Math.random() * 6) + 1});

      //var label = String(feature.properties.story.id)
      return L.marker(latlng, {icon: icon})
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
    for (var j = 0; j < jsonFilter.title[0].length; j++) {
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
    for (var j = 0; j < jsonFilter.authors[0].length; j++) {
      if (jsonFilter.authors[0][j] === undefined){
           return false
      }
      else {

        return jsonFilter.authors[0][j]
    }}
}

function genreSearch(){
    for (var j = 0; j < jsonFilter.genre.length; j++) {
      console.log(jsonFilter)
      return jsonFilter.genre[j]
    }
}

function mobilitySearch(){
    if (jsonFilter.mobility.length === undefined){
        return false
    }
    for (var j = 0; j < jsonFilter.mobility.length; j++) {
        if (jsonFilter.mobility[j] === undefined){
            return false
        }
        else {

            return jsonFilter.mobility[j]
        }}
}


function getTitleMarkers () {

     titleMarkers = L.geoJSON(featuresCollection, {

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
    //allGroups.addLayer(titleMarkers).addTo(map)
}

function getAuthorsMarkers () {

     authorsMarkers = L.geoJSON(featuresCollection, {

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
    //allGroups.addLayer(authorsMarkers).addTo(map)
}

function getGenreMarkers () {

  if (map.hasLayer(mainMarkers)){
       group.clearLayers()
  }

     genreMarkers = L.geoJSON(featuresCollection, {

        filter: function (feature) {

            for (var i = 0; i < featuresCollection.features.length; i++) {
                console.log(genreSearch())
                if (feature.properties.main === true && feature.properties.story.category === genreSearch() )
                {
                  return true
                }
                else {

                  return
                }
             }
        },
        pointToLayer: function (feature, latlng) {
            var label = String(feature.properties.story.category)
            return L.circleMarker(latlng, setColor).bindTooltip(label, {permanent: true, opacity: 0.7}).openTooltip() //, style(feature)); //,styled(feature));
        }

    }).addTo(map)


     //genreGroup.addLayer(genreMarkers).addTo(map)
}



function getMobiltyMarkers () {

     mobiltyMarkers = L.geoJSON(featuresCollection, {

        filter: function (feature) {

            for (var i = 0; i < featuresCollection.features.length; i++) {
                //A finir author = boucle sur le nombre des authors dans le récit (authors pluriel)
                if (feature.properties.main === true
                    && feature.properties.story.mobility === mobilitySearch()
                )
                {
                    return true
                }}
        },

        pointToLayer: function (feature, latlng) {
            var label = String(feature.properties.story.mobility)
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

  /**
   * function that check if authors are multiple and returns a list if true
   * @returns {string}
   */
  var authorsPopUp = function(){
    var authorsList =[]
    for(var i =0 ; i < feature.properties.story.authors.length; i++){
      //console.log(feature.properties.story.authors.length)
      if (feature.properties.story.authors.length > 1){
        authorsList.push(feature.properties.story.authors[i].label)
        //console.log(authorsList)

      }
      else {
        return feature.properties.story.authors[0].label
      }
    }
   // console.log(authorsList.join(', '))
    return authorsList.join(', <br>')
  }

  var dynamicIcon =  function(){
try {
    if (feature.properties.story.media_links.length === undefined ){
      return 'Autre'
    }

    else if (feature.properties.story.media_links.length > 1){
      return 'Multimédia'
    }
    else if (feature.properties.story.media_links[0].media_type === 'photo'){
      return 'Photo'
    }
    else if (feature.properties.story.media_links[0].media_type === 'vidéo') {
      return 'Video'
    }

    else if (feature.properties.story.media_links[0].media_type === 'pdf') {
        return 'Écrit'
      }

      else if (feature.properties.story.media_links[0].media_type === 'audio') {
        return 'Audio'
      }
    }

  catch(e) {
    return
  }

}

  var dynamicHeader = function(){

  try {
    if (feature.properties.story.media_links.length === undefined ){
      return 'grey'
    }

    else if (feature.properties.story.media_links.length > 1){
      return 'yellow'
    }
    else if (feature.properties.story.media_links[0].media_type === 'photo'){
      return 'purple'
    }
    else if (feature.properties.story.media_links[0].media_type === 'vidéo') {
      return 'red'
    }

    else if (feature.properties.story.media_links[0].media_type === 'pdf') {
      return 'green'
    }

    else if (feature.properties.story.media_links[0].media_type === 'audio') {
      return 'teal'
    }
  }

  catch(e) {
    return
  }

}

  var customPopup = '<div id="popUp" class="card mb-3" style="max-width: 20rem;">  '
  customPopup = customPopup + '<div id="mediaHeader" class="card-header" style="background-color: '+dynamicHeader()+'!important;">'
  customPopup = customPopup + '<div id="textHeader" class="mr-0 text-center"> <b>'+dynamicIcon()+'</b> </div>'
  customPopup = customPopup + '</div> '
  customPopup = customPopup + '<div id="mediaIconContainer" class="row rounded-circle">'
  customPopup = customPopup + '<img id="mediaIcon" class="rounded-circle" src="img/LRSM-'+dynamicIcon()+'.svg" width="40px"/>'
  customPopup = customPopup + '</div>'
  customPopup = customPopup + '<a href="javascript:getFilterMarkersById(' + feature.properties.story['id'] + '),openModal()"><img id="popUpImg" class="card-img-top" src='+feature.properties.story.thumbnail+' alt="Card image cap">'
  customPopup = customPopup + '<div id="popUpFooter" class="card-footer pr-0 pl-1 mt-0 pt-0 mb-0 pb-0">'
  customPopup = customPopup + '<h5 id="popUpTitle" class="mt-0"> '+ feature.properties.story.title +' </h5>'
  customPopup = customPopup + '<p id="popUpAuthor" class="mt-1 pl-1 mb-0 pb-1">'+authorsPopUp()+'</p>'
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
        $('#legend').css("display","inline")
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

  var authorsModal = function(){
    var authorsList =[]
    for(var i =0 ; i < feature.properties.story.authors.length; i++){
      //console.log(feature.properties.story.authors.length)
      if (feature.properties.story.authors.length > 1){
        authorsList.push(feature.properties.story.authors[i].label)
        //console.log(authorsList)

      }
      else {
        return feature.properties.story.authors[0].label
      }
    }
    // console.log(authorsList.join(', '))
    return authorsList.join(' <br>')
  }

  var collaboratorsModal = function(){
    var collaboratorsList =[]
    for(var i =0 ; i < feature.properties.story.collaborators.length; i++){
      //console.log(feature.properties.story.authors.length)
      if (feature.properties.story.collaborators.length > 1){
        collaboratorsList.push(feature.properties.story.collaborators[i].label)

      }
      else {
        return feature.properties.story.collaborators[0].label
      }
      return collaboratorsList.join(', <br>')
    }
    // console.log(authorsList.join(', '))

  }

  var keyWordsModal = function(i){
    var tagsList =[]
    for(var i  ; i < feature.properties.story.tags.length; i++){
      //console.log(feature.properties.story.authors.length)
      if (feature.properties.story.tags.length > 1){
        tagsList.push(feature.properties.story.tags[i].label)
        return tagsList.join(', ').split(',')
        //console.log(authorsList)
      }
      else {
        return feature.properties.story.tags[i].label
      }
    }
    // console.log(authorsList.join(', '))
   // return tagsList.join(', ').split(',')
  }


  var mediaFrameModal = function (){
    /*for(var i  ; i < feature.properties.story.media_links.length; i++){

      if (feature.properties.story.media_links.length > 1){
        console.log(feature.properties.story.media_links.length)
         return '<iframe class="mx-auto" id="modalframe" width="500" height="280" frameborder="0" src="'+feature.properties.story.media_links[i].link+'"&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&amp;visual=true"></iframe>'

      }
      else {
        console.log(feature.properties.story.media_links.length)
        return '<iframe class="mx-auto mt-4 col-sm-12 col-md-10" src="'+feature.properties.story.media_links[i].link+'" width="440" height="248" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
      }
    }*/
    return feature.properties.media
  }



try {
      var articleTitle = $('<h2 class="pt-0" id="articleTitle">' + feature.properties.story.title + '</h2>')
    }
    catch(e) {
      console.log(e)
    }
finally {
  articleTitle
}

try {
    var articleAuthors = $('<h5>'+ authorsModal()+ '</h5>')
  }     catch(e) {
  console.log(e)
  }
finally {
  articleAuthors
}

try {
    var articleCollaborators = $('<h5>'+collaboratorsModal()+'</h5>')
  }
  catch(e) {
    console.log(e)
  }
  finally {
  articleCollaborators
}
try {
    var articleMobility =$('<h6 id ="modalMobility" class="text-center"> '+feature.properties.story.mobility+' </h6>')
  }     catch(e) {
  console.log(e)
  }
finally {
  articleMobility
}
try {
    var articleLocation =$('<h6 id ="modalLocation" class="text-center"> '+feature.properties.story.main_location['label']+' </h6>')
  }     catch(e) {
  console.log(e)
  }
finally {
  articleLocation
}
try {
    var articleProject=$('<h6> '+feature.properties.story.project['label']+'</h6>')
  }
  catch(e) {
    console.log(e)
  }
finally {
  articleProject
}

try {
    var articleDate=$('<h6> '+feature.properties.story.date+'</h6>')
  }
  catch(e) {
    console.log(e)
  }
finally {
  articleDate
}

try {
  var kwPills = $('<div></div>')
  var articleKeyWord = $('<script>$(".badgeRdColor").css("background-color", "rgb(35,195,237)")</script><span id="tag" class="badge badge-pill badgeRdColor">'+keyWordsModal()+'</span>')
    }

  catch(e) {
    console.log(e)
  }
  finally {
  for(var i =0 ; i < feature.properties.story.tags.length; i++){

    kwPills.append($('<script>$(".badgeRdColor").css("background-color", "rgb(35,195,237)")</script><span id="tag'+i+'" class="badge badge-pill badgeRdColor">'+keyWordsModal(i)+'</span>'))
  }
}

try{
  var mainImg =$('<img class="img-fluid d-block align-item-center mr-auto ml-auto" src="'+feature.properties.story.thumbnail+'">')
}
catch(e){
    console.log(e)
}
finally {
    mainImg
  }

  try{
    var mainDescription =$('<p>'+feature.properties.story.text+'</p>')
  }
  catch(e){
    console.log(e)
  }
  finally {
    mainDescription
  }


try {
//  var sections = $('<div></div>')
  //for(var i =0 ; i < filterMarkers.getLayers().length; i++) {
    var articleSection = $('<section id=' + feature.properties.order + 'class="col-md-10 col-lg-10 mx-auto">' +
      '          <div class="col-md-10 col-lg-10 mx-auto">' +
      '            <span id="elementNumber"> <h4>' + feature.properties['title'] + '</h4> </span>' +
      '          </div>' +
      '          <div class="col-md-10 col-lg-10 mx-auto">' +
      '            <span> <h5>' + feature.properties['date'] + ' | ' + feature.properties['date'] + ' </h5>  </span>' +
      '          </div>' +
      '        <div class="row">' +
      '<div class="col-md-9 col-lg-9 mx-auto">'+
      mediaFrameModal() +
      '       <span class="text-justify text-center">  ' + feature.properties['description'] + ' </span>' +
      '        </div><hr></section>')
   // sections.append(articleSection)
  }
//}
catch(e) {
  console.log(e)
}
finally{
  articleSection
}

  $('#articles').append(articleSection)

  $('#mainDescription').empty().html(mainDescription)
  $('#mainImg').empty().html(mainImg)

  $('#articleKeyWord').empty().html(kwPills)
  $('#articleDate').empty().html(articleDate)
  $('#articleProject').empty().html(articleProject)
  $('#articleLocation').empty().html(articleLocation)
  $('#articleMobility').empty().html(articleMobility)
  $('#articleCollaborator').empty().html(articleCollaborators)
  $('#articleAuthor').empty().html(articleAuthors)
  $('#articleTitle').empty().html(articleTitle)
  //$('#articles').append(articleSection)


}
  /**
    * function that check for the container id and zoom to the parent feature
    * @param {numeric} newId
    */

var narrative = document.getElementById('articles')
var sections = narrative.getElementsByTagName('section')
var currentId = ''

function setId (newId) {
          // If the ID hasn't actually changed, don't do anything
  if (newId === currentId) return
          // Otherwise, iterate through layers, setting the current
          // marker to a different color and zooming to it.
  filterMarkers.eachLayer(function (layer) {
    if(String(layer.feature.properties['order'])=== undefined){
      console.log('article undefined')
      return false
    }
    else if (String(layer.feature.properties['order']) === newId) {
      map.flyTo([layer.feature.geometry.coordinates[1], layer.feature.geometry.coordinates[0]], 15)
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




