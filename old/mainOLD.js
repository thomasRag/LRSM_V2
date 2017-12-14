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



function getRandomColor () {
  var letters = '0123456789ABCDEF'.split('')
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15.66)]
  }
  return color
}

/**
 * sort a ul li list by id
 *
 */
function myTest(){
  var list = $("#arraySelectors");
  var desc= false;
  list.append(list.children().get().sort(function(a, b) {
    var aProp = $(a).find("span").text()
    var bProp = $(b).find("span").text();
    return (aProp > bProp ? 1 : aProp < bProp ? -1 : 0) * (desc ? -1 : 1);
  }));
}



/** **************Buttons filter functions*******************/

/**
 * listen to the button to toggle the modal time slider
 *
 */

$(function(){

  $('#hrefDate').click(function () {
    $('#dateRangeSliderModal').modal('toggle')
  })
})

/**
 * function that listen to the Mobility / Categories buttons and push values to its specific array
 * @type {Array}
 */
$('.btn-rounded').click(function () {
  if ($(this).hasClass('btn-active')) {
    $(this).removeClass('btn-active')

  } else {
    $(this).addClass('btn-active')

  }
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

    $("#recitInfoPanel").animate({left: "-1000px"},0)
    $("#recitInfoPanel").addClass('modalActive')
    $("#map").width('85%')}
  map.closePopup()
}
/**
 * function that dismiss the panel revert back to the  the popup
 */
function closeModal(){
  $('#panelCloseButton').click(function(){
    group.clearLayers()
    $("#sections").empty()
    $("#recitInfoPanel").animate({left: "-1000px"})
    $("#recitInfoPanel").addClass('modalInactive')

    getMainMarkers()
    $("#map").width('85%')}
  )
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

  if (map.hasLayer(mainMarkers)){
    // For each marker, consider whether it is currently visible by comparing  with the current map bounds.
    mainMarkers.eachLayer(function (marker) {
      if (bounds.contains(marker.getLatLng())) {
        inBounds.push(marker.feature.properties.story.title)

      }
    })
    myTest()
  }
  else if (map.hasLayer(markerCluster)){
    /* function that retrive unique objects from an array */

    markerCluster.eachLayer(function (marker) {
      if (bounds.contains(marker.getLatLng())) {
        inBounds.push(marker.feature.properties.author.name)

      }
    })
    myTest()
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

// on each feature call the modal and populate it with the specific related information gathered in the geojson
    onEachFeature: modalPopulate

  }).addTo(map)

  $('#container').addClass('inFocus')// Change container class in to outfocus if

  group.clearLayers() // remove the main markers
  filteredGroup.addLayer(filterMarkers).addTo(map) // add the filteredMarkers to the filteredGroup
  map.fitBounds(filterMarkers.getBounds(),{maxZoom:14})//.pad(Math.sqrt(2) / 2)) // fit bounds of the filtered specifici markers
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
        iconSize:[16,16],
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
  console.log(mainMarkers.getLayers().length)
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

function locationSearch(){
  if (jsonFilter.location[0].length === undefined){
    return false
  }
  for (var j = 0; j < jsonFilter.location[0].length; j++) {
    if (jsonFilter.location[0][j] === undefined){
      return false
    }
    else {

      return jsonFilter.location[0][j]
    }}
}

function genreSearch(){
  for (var j = 0; j < jsonFilter.genre.length; j++) {
    console.log(jsonFilter)
    return jsonFilter.genre[j]
  }
}

function mobilitySearch(){
  for (var j = 0; j < jsonFilter.mobility.length; j++) {
    console.log(jsonFilter)
    return jsonFilter.mobility[j]
  }
}


/**
 * returns the hardcoded color for the categories in the legend
 *
 * @param feature
 * @returns {string}
 */

function setCatStyle(feature) {
  if (feature.properties.story.category === 'dessin') {
    return 'rgb(255, 195, 15);'
  }
  else if (feature.properties.story.category === 'video') {
    return 'red'
  }
  else if (feature.properties.story.category === 'audio') {
    return 'rgb(50, 255, 241);'
  }
  else if (feature.properties.story.category === 'photo') {
    return  'rgb(192, 35, 238);'
  }
  else if (feature.properties.story.category === 'multimédia') {
    return 'yellow'
  }
  else if (feature.properties.story.category === 'écrit') {
    return 'rgb(71, 255, 95);'
  }
  else {
    return 'white'
  }
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
  group.clearLayers()
  titleGroup.addLayer(titleMarkers).addTo(map)
  //allGroups.addLayer(titleMarkers).addTo(map)
}
/**
 * create a new L.Layergroup everytime we filter by authors
 */
function getAuthorsMarkers () {

  authorsMarkers = L.geoJSON(featuresCollection, {

    filter: function (feature) {

      if(feature.properties.main === true){
        for (var i = 0; i < feature.properties.story.authors.length; i++) {
          if (feature.properties.story.authors[i].label === authorsSearch()){
            return true
          }
        }
      }
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
  group.clearLayers()
  authorsGroup.addLayer(authorsMarkers).addTo(map)
  //allGroups.addLayer(authorsMarkers).addTo(map)
}
/**
 * create a new L.Layergroup everytime we filter by categories
 */
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

  genreGroup.addLayer(genreMarkers).addTo(map)
}
/**
 * create a new L.Layergroup everytime we filter by mobility
 */
function getMobiltyMarkers () {

  if (map.hasLayer(mainMarkers)){
    group.clearLayers()
  }

  mobilityMarkers = L.geoJSON(featuresCollection, {

    filter: function (feature) {

      for (var i = 0; i < featuresCollection.features.length; i++) {
        console.log(genreSearch())
        if (feature.properties.main === true && feature.properties.story.mobility === mobilitySearch() )
        {
          return true
        }
        else {

          return
        }
      }
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

  mobilityGroup.addLayer(mobilityMarkers).addTo(map)
}

/**
 *create a new L.Layergroup everytime we filter by locations
 */
function getLocationMarkers () {

  locationMarkers  = L.geoJSON(featuresCollection, {

    filter: function (feature) {

      if(feature.properties.main === true){
        for (var i = 0; i < feature.properties.story.locations.length; i++) {
          if (feature.properties.story.locations[i].label === locationSearch()){
            return true
          }
        }
      }
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
  group.clearLayers()
  locationGroup.addLayer(locationMarkers).addTo(map)
  //allGroups.addLayer(authorsMarkers).addTo(map)
}

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

  /**
   *function that set dynamically the text in the popup header
   * @returns {string}
   */
  var dynamicIcon =  function(){
    try {
      if (feature.properties.story.category === undefined ){
        return 'Autre'
      }

      else if (feature.properties.story.category === 'photo'){
        return 'Photo'
      }
      else if (feature.properties.story.category === 'video') {
        return 'Video'
      }

      else if (feature.properties.story.category === 'écrit') {
        return 'Écrit'
      }

      else if (feature.properties.story.category === 'audio') {
        return 'Audio'
      }
      else if (feature.properties.story.category === 'dessin') {
        return 'Dessin'
      }
      else if (feature.properties.story.category === 'multimédia') {
        return 'multimédia'
      }
    }

    catch(e) {
      return
    }

  }
  /**
   *function that set dynamically the color in the popup header
   * @returns {string}
   */
  var dynamicHeader = function(){

    try {
      if (feature.properties.story.category === 'photo'){
        return 'purple'
      }
      else if (feature.properties.story.category === 'video') {
        return 'red'
      }

      else if (feature.properties.story.category === 'dessin') {
        return 'orange'
      }

      else if (feature.properties.story.category === 'audio') {
        return 'turquoise'
      }
      else if (feature.properties.story.category === 'écrit') {
        return 'lawngreen'
      }
      else if (feature.properties.story.category === 'multimédia') {
        return 'yellow'
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
 * function that tells what to do on onEachFeature of the filterMarkers and populate the modal
 * @param {Object} feature
 * @param {Object} layer
 */
function modalPopulate (feature, layer) {
  // CREATE DYNAMICALLY THE HTML CODE TO POPULATE THE MODAL SCROLL BY CHAPTER SECTION OF THE STORIES
  // / /////////////////////////////////////////////////////////////

  var authorsModal = function(){
    var authorsList =[]
    for(var i =0 ; i < feature.properties.story.authors.length; i++){

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

    if(feature.properties.story.collaborators === []){
      return false
    }
    var collaboratorList =[]
    for(var i =0 ; i < feature.properties.story.collaborators.length; i++){
      if (feature.properties.story.collaborators.length > 1){
        collaboratorList.push(feature.properties.story.collaborators[i].label)
      }
      else {
        return feature.properties.story.collaborators[0].label
      }
    }
    return collaboratorList.join(' <br>')
  }

  var keyWordsModal = function(i){
    var tagsList =[]
    for(i ; i < feature.properties.story.tags.length; i++){
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

  var projectModal = function(){
    return feature.properties.story.project.label
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

  var dateModal = function(){
    var dateList = []
    if (feature.properties.story.date_type === "range"){
      dateList.push(feature.properties.story.date_min + ' - ' + feature.properties.story.date_max )
      return dateList
    }
    else if (feature.properties.story.date_type === "multi"){
      for(var i=0; i < feature.properties.story.multi_dates.length;i++){
        dateList.push(feature.properties.story.multi_dates[i].multi_date)
        dateList.join(' <br>')
        return dateList
      }
    }
    else if (feature.properties.story.date_type === "single"){
      return feature.properties.story.date
    }
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
  }
  catch(e) {
    console.log(e)
  }
  finally {
    articleAuthors
  }

  try {
    var articleCollaborators = $('<h6> Coll. '+collaboratorsModal()+'</h6>')
  }
  catch(e) {
    console.log(e)
  }
  finally {
    articleCollaborators
  }
  try {
    var articleMobility = $('<h6 id ="modalMobility" class="text-center"> '+feature.properties.story.mobility+' </h6>')
  }     catch(e) {
    console.log(e)
  }
  finally {
    articleMobility
  }
  try {
    var articleLocation = $('<h6 id ="modalLocation" class="text-center"> '+feature.properties.story.main_location['label']+' </h6>')
  }     catch(e) {
    console.log(e)
  }
  finally {
    articleLocation
  }
  try {
    var articleProject= $('<h6> '+projectModal()+'</h6>')
  }
  catch(e) {
    console.log(e)
  }
  finally {
    articleProject
  }

  try {
    var articleDate=$('<h6> '+dateModal()+'</h6>')
  }
  catch(e) {
    console.log(e)
  }
  finally {
    articleDate
  }

  try {
    var kwPills = $('<div></div>')
    var articleKeyWord = $('<script>$(".badgeRdColor").css("background-color", "rgb(35,195,237)")</script><span id="tag" class="badge badge-pill badgeRdColor d-flex flex-wrap">'+keyWordsModal()+'</span>')
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


    if(feature.properties.order === 0){
      var articleSection = $('<section id="0" class="col-md-10 col-lg-10 mx-auto">' +
        '          <div class="col-md-10 col-lg-10 mx-auto">' +
        '            <span id="elementNumber"> <h4></h4> </span>' +
        '          </div>' +
        '          <div class="col-md-10 col-lg-10 mx-auto">' +
        '            <span><h5></h5></span>' +
        '          </div>' +
        '        <div class="row">' +
        '<div class="col-md-9 col-lg-9 mx-auto">'+
        '       <span class="text-justify text-center"></span>' +
        '        </div><hr></section>')
      // sections.append(articleSection)
    }
    else{

      var articleSection = $('<section id="'+ feature.properties.order +'" class="col-md-10 col-lg-10 mx-auto">' +
        '          <div class="col-md-10 col-lg-10 mx-auto">' +
        '            <span id="elementNumber"> <h4>' + feature.properties.title + '</h4> </span>' +
        '          </div>' +
        '          <div class="col-md-10 col-lg-10 mx-auto">' +
        '            <span><h5>'+ feature.properties.date +'</h5></span>' +
        '          </div>' +
        '        <div class="row">' +
        '<div class="col-md-9 col-lg-9 mx-auto">'+
        mediaFrameModal() +
        '       <span class="text-justify text-center">  ' + feature.properties.description + ' </span>' +
        '        </div><hr></section>')
      // sections.append(articleSection)
    }

  }
//}
  catch(e) {
    console.log(e)
  }



  $('#sections').append(articleSection)
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


function articleReset (){
  $('#articles').empty()
  $('#mainDescription').empty()
  $('#mainImg').empty()
  $('#articleKeyWord').empty()
  $('#articleDate').empty()
  $('#articleProject').empty()
  $('#articleLocation').empty()
  $('#articleMobility').empty()
  $('#articleCollaborator').empty()
  $('#articleAuthor').empty()
  $('#articleTitle').empty()
}