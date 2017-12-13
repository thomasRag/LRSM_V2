/** ** LOOP THROUGHT EVERY CATEGORY TO FILTER THE DATA *****/
/*******************************************/

/**
* Remove null values from the Fulcrum API Endpoint
*
**/
function removeNull (o) {
  for (var key in o) {
    if (o[key] === null) o[key] = ''
    if (typeof o[key] === 'object') removeNull(o[key])
  }
}(featuresCollection)

/* initialize arrays */

var genreData = []
var authorData = []
var keywordData = []
var locationData = []
var titreData = []
var mobilityData = []
var projectData = []

function getAuthor(i) {

for (var j = 0; j < featuresCollection.features.length; j++){
  //console.log(feature.properties.story.authors.length)
  if (featuresCollection.features[j].properties.story.authors.length > 1){
      for(var k = 0; k < featuresCollection.features[j].properties.story.authors.length; k++){
        i.push(featuresCollection.features[j].properties.story.authors[k].label)
      }
  }
  else {
      i.push(featuresCollection.features[j].properties.story.authors[0].label)
    }
  }
}
getAuthor(authorData)

function getLocation(i) {

  for (var j = 0; j < featuresCollection.features.length; j++){

    if (featuresCollection.features[j].properties.story.locations.length === undefined){
      return
    }
    else if (featuresCollection.features[j].properties.story.locations.length === 0){
      return
    }
    else if (featuresCollection.features[j].properties.story.locations.length > 1){
      for(var k = 0; k < featuresCollection.features[j].properties.story.locations.length; k++){
        i.push(featuresCollection.features[j].properties.story.locations[k].label)
      }
    }
    else {
      i.push(featuresCollection.features[j].properties.story.locations[0].label)
    }
  }
}
getLocation(locationData)

function getKeyword(i) {

  for (var j = 0; j < featuresCollection.features.length; j++){
    //console.log(feature.properties.story.authors.length)
    if (featuresCollection.features[j].properties.story.tags.length > 1){
      for(var k = 0; k < featuresCollection.features[j].properties.story.tags.length; k++){
        i.push(featuresCollection.features[j].properties.story.tags[k].label)
      }
    }
    else {
      i.push(featuresCollection.features[j].properties.story.tags[0].label)
    }
  }
}
getKeyword(keywordData)

function getGenre (i) {

  for (var j = 0; j < featuresCollection.features.length; j++) { i.push(featuresCollection.features[j].properties.story.category) }
}
getGenre(genreData)

function getTitre (i) {
  for (var j = 0; j < featuresCollection.features.length; j++) { i.push(featuresCollection.features[j].properties.story.title) }
}
getTitre(titreData)

function getMobility (i) {
  for (var j = 0; j < featuresCollection.features.length; j++) { i.push(featuresCollection.features[j].properties.story.mobility) }
}
getMobility(mobilityData)
/*
function getProject(i){

  for (var j = 0; j < featuresCollection.features.length; j++){

    if (featuresCollection.features[j].properties.story.project.length === undefined){
      console.log('undefined'+featuresCollection.features[j].properties.story.id)
    }
    else if (featuresCollection.features[j].properties.story.project.length === 0){
      console.log('0'+featuresCollection.features[j].properties.story.id)
    }
    else if (featuresCollection.features[j].properties.story.project.length === null){
      console.log('null'+featuresCollection.features[j].properties.story.id)
    }
    else if (featuresCollection.features[j].properties.story.project.length > 1){
      for(var k = 0; k < featuresCollection.features[j].properties.story.project.length; k++){
        i.push(featuresCollection.features[j].properties.story.project[k].label)
      }
    }
    else {
      i.push(featuresCollection.features[j].properties.story.project[0].label)
    }
  }
}
getProject(projectData)
*/
/* function that retrive unique objects from an array */
Array.prototype.unique = function () {
  return this.filter(function (value, index, self) {
    return self.indexOf(value) === index
  })
}

/** ** Always capitalize the first letter *****/
/*******************************************/
/*
  for(var i = 0 ; i < genreData.length ; i++){
    genreData[i] = genreData[i].charAt(0).toUpperCase()+ genreData[i].substr(1);;

  };
  for(var i = 0 ; i < authorData.length ; i++){
      authorData[i] = authorData[i].charAt(0).toUpperCase()+ authorData[i].substr(1);;

  };

  for(var i = 0 ; i < keywordData.length ; i++){
  keywordData[i] = keywordData[i].charAt(0).toUpperCase()+ keywordData[i].substr(1);;

  };

  for(var i = 0 ; i < locationData.length ; i++){
      locationData[i] = locationData[i].charAt(0).toUpperCase()+ locationData[i].substr(1);;

  };

*/

/** *** initialize select2 *******/
/*******************************************/


$('#authorSearchBox').select2()
$('#keywordSearchBox').select2()
$('#locationSearchBox').select2()
$('#titreSearchBox').select2()
$('#projectSearchBox').select2()
/** * initializing select2 searchbox data ***/
/*******************************************/

// var selectedItems = []

function searchBoxAuthor () {
  $('#authorSearchBox').select2(

    {
      placeholder: 'Filtrez par auteur',
      multiple: true,
      allowClear: true,
      data: authorData.unique()
    }
   )
};
searchBoxAuthor()

/* POPULATE THE SELECT BOX WITH ALL THE VALUES
  var authorOptions = $("#authorSearchBox option");
  authorOptions.each(function() {
      selectedItems.push( $(this).val() );
  });

  $("#authorSearchBox").val(selectedItems).trigger("change");
*/

/* ///////////////////////////////////////////////////////////////////////
/* POPULATE THE SELECT BOX WITH ALL THE VALUES
  $("#authorSearchBox").val(selectedItems).change(function() {
    //console.log($("#authorSearchBox").val())
      getFilterMarkers ($("#authorSearchBox").val());
});

//////////////////////////////////////////////////////////////////////// */

function searchBoxKeyword () {
  $('#keywordSearchBox').select2(

    {
      placeholder: 'Filtrez par mots-clés',
      multiple: true,
      allowClear: true,
      data: keywordData.unique()
    }
   )
};
searchBoxKeyword()

/* POPULATE THE SELECT BOX WITH ALL THE VALUES
  var keywordOptions = $("#keywordSearchBox option");
  keywordOptions.each(function() {
      selectedItems.push( $(this).val() );
  });

  $("#keywordSearchBox").val(selectedItems).trigger("change"); */

/// //////////////////////////////////////////////////////////////////////

function searchBoxLocation () {
  $('#locationSearchBox').select2(

    {
      placeholder: 'Filtrez par emplacement',
      multiple: true,
      allowClear: true,
      data: locationData.unique()
    }
   )
};
searchBoxLocation()

/* POPULATE THE SELECT BOX WITH ALL THE VALUES
  var lcoationOptions = $("#locationSearchBox option");
  lcoationOptions.each(function() {
      selectedItems.push( $(this).val() );
  });

  $("#locationSearchBox").val(selectedItems).trigger("change"); */

/// //////////////////////////////////////////////////////////////////////

function searchBoxTitre () {
  $('#titreSearchBox').select2(

    {
      placeholder: 'Filtrez par titre',
      multiple: true,
      allowClear: true,
      data: titreData.unique()
    }

   )
};

searchBoxTitre()

/* POPULATE THE SELECT BOX WITH ALL THE VALUES
  var titreOptions = $("#titreSearchBox option");
  titreOptions.each(function() {
      selectedItems.push( $(this).val() );
  });

  $("#titreSearchBox").val(selectedItems).trigger("change"); */
/// //////////////////////////////////////////////////////////////////////

/// //////////////////////////////////////////////////////////////////////

function searchBoxProject () {
  $('#projectSearchBox').select2(

    {
      placeholder: 'Filtrez par projets',
      multiple: true,
      allowClear: true,
      data: projectData
    }

  )
};

searchBoxProject()

/// //////////////////////////////////////////////////////////////////////

/** * retrieve searchbox selected data(s) ***/
/*******************************************/
var arraySelectors = []



 //$(".select2-multiple").on("select2:unselect", function (e) { console.log("select2:unselect", e); });

/**
 * Loop through all buttons , validate if they are already in the aray and push the value in master array
 */

/**
 * function that update the json for every select2 events
 * @type {Array}
 */


var mobilityArrays = []
var genreArrays = []
var titleArrays= []
var projetArrays= []
var authorsArrays= []
var keyWordArrays= []
var locationArrays= []
var timeArrays= []

/**
 * function that update the json for every select2 events
 * @type {Array}
 */

$(function(){
    $("#titreSearchBox").change(function() {
        if ($(this).val() != "") {
            $('#titleFilterIcon').removeClass("d-none")
            $('#titleFilterIcon').addClass("d-inline")
        }
        else{
            $('#titleFilterIcon').removeClass("d-inline")
            $('#titleFilterIcon').addClass("d-none")
        }
    })
    $("#authorSearchBox").change(function() {
        if ($(this).val() != "") {
            $('#authorsFilterIcon').removeClass("d-none")
            $('#authorsFilterIcon').addClass("d-inline")
        }
        else{
            $('#authorsFilterIcon').removeClass("d-inline")
            $('#authorsFilterIcon').addClass("d-none")
        }
    })
    $("#locationSearchBox").change(function() {
        if ($(this).val() != "") {
            $('#locationFilterIcon').removeClass("d-none")
            $('#locationFilterIcon').addClass("d-inline")
        }
        else{
            $('#locationFilterIcon').removeClass("d-inline")
            $('#locationFilterIcon').addClass("d-none")
        }
    })
    $("#projectSearchBox").change(function() {
        if ($(this).val() != "") {
            $('#projectsFilterIcon').removeClass("d-none")
            $('#projectsFilterIcon').addClass("d-inline")
        }
        else{
            $('#projectsFilterIcon').removeClass("d-inline")
            $('#projectsFilterIcon').addClass("d-none")
        }
    })
    $("#keywordSearchBox").change(function() {
        if ($(this).val() != "") {
            $('#keywordFilterIcon').removeClass("d-none")
            $('#keywordFilterIcon').addClass("d-inline")
        }
        else{
            $('#keywordFilterIcon').removeClass("d-inline")
            $('#keywordFilterIcon').addClass("d-none")
        }
    })
})


/**
 * Listen to all the select2 boxes, if all empty , getMainMarkers
 * @type {Array}
 */
/*
$(function (){
    $(".select2-multiple").change(function(){
        if(
            $(this).val() === ""){

            if(map.hasLayer(authorsMarkers)) {
                console.log('authorsMarkers cleared')
                authorsMarkers.clearLayers()
            }
            else if(map.hasLayer(titleMarkers)) {
                console.log('titleMarkers cleared')
                titleMarkers.clearLayers()
            }

        }

        else {
            getMainMarkers()
        }

    })
})*/
/**
 *function that remove duplicate in the array
 *
 */

function arrayRemover(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    }

}


/**
 *
 * TITLE
 *
 */

$('#titreSearchBox').on('select2:select', function (e) {
    titleArrays= []
    titleArrays.push($(e.currentTarget).val())
    updateJSON(titleArrays,'title')
    getTitleMarkers()
    })
$('#titreSearchBox').on('select2:unselecting', function (e) {
    var el = $(e.currentTarget).val()

  if( $('#titreSearchBox').val().length === 0 ) {
    titleGroup.clearLayers()
    titleArrays= []
    updateJSON(titleArrays,'title')
    getMainMarkers()
  }
  else{
    titleGroup.clearLayers()
        arrayRemover(titleArrays,el)
        updateJSON(titleArrays,'title')
        getTitleMarkers()
    }
})

$('#titreSearchBox').on('select2:unselect', function (e) {

  var el = $(e.currentTarget).val()

  if( $('#titreSearchBox').val().length === 0 ) {

    titleGroup.clearLayers()
    titleArrays= []
    updateJSON(titleArrays,'title')
    getMainMarkers()
  }
    else {

        titleGroup.clearLayers()
        arrayRemover(titleArrays, el)
        updateJSON(titleArrays, 'title')
        getTitleMarkers()
    }
    })

/**
 *
 * AUTHORS
 *
 */

$('#authorSearchBox').on('select2:select', function (e) {
        authorsArrays.length = 0
        authorsArrays.push($(e.currentTarget).val())
        updateJSON(authorsArrays,'authors')
        getAuthorsMarkers()
   })
$('#authorSearchBox').on('select2:unselecting', function (e) {
    var el = $(e.currentTarget).val()

    if( $('#authorSearchBox').val().length === 0 ) {
      authorsGroup.clearLayers()
      authorsArrays= []
        updateJSON(authorsArrays,'authors')
        getMainMarkers()
      }
    else{
    //authorsGroup.clearLayers()
    arrayRemover(authorsArrays,el)
    updateJSON(authorsArrays,'authors')
    getAuthorsMarkers()
    }
})

$('#authorSearchBox').on('select2:unselect', function (e) {
  var el = $(e.currentTarget).val()
  if( $('#authorSearchBox').val().length === 0 ) {
    authorsGroup.clearLayers()
    authorsArrays= []
    updateJSON(authorsArrays,'authors')
    getMainMarkers()
  }
    else{
        authorsGroup.clearLayers()
        arrayRemover(authorsArrays,el)
        updateJSON(authorsArrays,'authors')
        getAuthorsMarkers()
    }
})


/**
 *
 * PROJECT SEARCH BOX EVENTS
 *
 */


$('#projectSearchBox').on('select2:select', function (e) {
  projetArrays.length = 0
  projetArrays.push($(e.currentTarget).val())
  updateJSON(projetArrays,'project')
  getProjectMarkers()
})
$('#projectSearchBox').on('select2:unselecting', function (e) {
  var el = $(e.currentTarget).val()

  if( $('#projectSearchBox').val().length === 0 ) {
    projectsGroup.clearLayers()
    projetArrays= []
    updateJSON(projetArrays,'project')
    getMainMarkers()
  }
  else{
    //authorsGroup.clearLayers()
    arrayRemover(projetArrays,el)
    updateJSON(projetArrays,'project')
    getProjectMarkers()
  }
})

$('#projectSearchBox').on('select2:unselect', function (e) {
  var el = $(e.currentTarget).val()
  if( $('#projectSearchBox').val().length === 0 ) {
    projectsGroup.clearLayers()
    projetArrays= []
    updateJSON(projetArrays,'project')
    getMainMarkers()
  }
  else{
    projectsGroup.clearLayers()
    arrayRemover(projetArrays,el)
    updateJSON(projetArrays,'project')
    getProjectMarkers()
  }
})

/**
 *
 * LOCATION SEARCH BOX EVENTS
 *
 */

$('#locationSearchBox').on('select2:select', function (e) {
  locationArrays.length = 0
  locationArrays.push($(e.currentTarget).val())
  updateJSON(locationArrays,'location')
  getLocationMarkers()
})
$('#locationSearchBox').on('select2:unselecting', function (e) {
  var el = $(e.currentTarget).val()

  if( $('#locationSearchBox').val().length === 0 ) {
    locationGroup.clearLayers()
    locationArrays= []
    updateJSON(locationArrays,'location')
    getMainMarkers()
  }
  else{
    //authorsGroup.clearLayers()
    arrayRemover(locationArrays,el)
    updateJSON(locationArrays,'location')
    getLocationMarkers()
  }
})

$('#locationSearchBox').on('select2:unselect', function (e) {
  var el = $(e.currentTarget).val()
  if( $('#locationSearchBox').val().length === 0 ) {
    locationGroup.clearLayers()
    locationArrays= []
    updateJSON(locationArrays,'location')
    getMainMarkers()
  }
  else{
    locationGroup.clearLayers()
    arrayRemover(locationArrays,el)
    updateJSON(locationArrays,'location')
    getLocationMarkers()
  }
})
/**
 *
 * KEYWORDS SEARCH BOX EVENTS
 *
 */


$('#keywordSearchBox').on('select2:select', function (e) {
  keyWordArrays.length = 0
  keyWordArrays.push($(e.currentTarget).val())
  updateJSON(keyWordArrays,'keyword')
  getkeywordMarkers()
})
$('#keywordSearchBox').on('select2:unselecting', function (e) {
  var el = $(e.currentTarget).val()

  if( $('#keywordSearchBox').val().length === 0 ) {
    keywordsGroup.clearLayers()
    keywordArrays= []
    updateJSON(keyWordArrays,'keyword')
    getMainMarkers()
  }
  else{
    //authorsGroup.clearLayers()
    arrayRemover(keyWordArrays,el)
    updateJSON(keyWordArrays,'keyword')
    getkeywordMarkers()
  }
})

$('#keywordSearchBox').on('select2:unselect', function (e) {
  var el = $(e.currentTarget).val()
  if( $('#keywordSearchBox').val().length === 0 ) {
    keywordsGroup.clearLayers()
    keyWordArrays= []
    updateJSON(keyWordArrays,'keyword')
    getMainMarkers()
  }
  else{
    keywordsGroup.clearLayers()
    arrayRemover(keyWordArrays,el)
    updateJSON(keyWordArrays,'keyword')
    getkeywordMarkers()
  }
})

/**
 * function that listen to the mobility buttons and push values to its specific array
 * @param {Array}
 */
function mobilityArray(e){
  var firedValue = e.val();
  if(e.hasClass('btn-active')){
    mobilityArrays.push(firedValue)
    $('#mobilityFilterIcon').removeClass("d-none")
    $('#mobilityFilterIcon').addClass("d-inline")

  }
  else{
    //remove the existing occurence of the value in the master array
    for (var i = 0, j = 0; i < genreArrays.length; i++) {
      if (mobilityArrays[i] != firedValue)
        mobilityArrays[j++] = mobilityArrays[i];
    }
    mobilityArrays.length = j;
    updateJSON(mobilityArrays,'mobility')

  }
}

/**
 * function that listen to the genre buttons and push values to its specific array
 * @type {Array}
 */
function genreArray(e){
  var firedValue = e.val();
  if(e.hasClass('btn-active')){
    genreArrays.push(firedValue)
    $('#genreFilterIcon').removeClass("d-none")
    $('#genreFilterIcon').addClass("d-inline")

  }
  else{
    //remove the existing occurence of the value in the master array
    for (var i = 0, j = 0; i < genreArrays.length; i++) {
      if (genreArrays[i] != firedValue)
        genreArrays[j++] = genreArrays[i];
    }
    genreArrays.length = j;
    updateJSON(genreArrays,'genre')

  }

}

/**
 * genreButtons
 * function that turn on off the filter icon if there are 0 btn-active
 */

$('#genreButtons > .btn-filter').click(function() {
    var $items = $('#genreButtons > .btn-filter > .btn-active');

    if($items.length === 0)
    {
      $('#genreFilterIcon').removeClass("d-inline")
      $('#genreFilterIcon').addClass("d-none")
    }
    genreGroup.clearLayers()
    getGenreMarkers()
  })
/**
 * mobilityButtons
 * function that turn on off the filter icon if there are 0 btn-active
 */
$('#mobilityButtons > .btn-filter').click(function() {
    var $items = $('#mobilityButtons > .btn-filter > .btn-active');
    if($items.length === 0)
    {
      $('#mobilityFilterIcon').removeClass("d-inline")
      $('#mobilityFilterIcon').addClass("d-none")
    }
  mobilityGroup.clearLayers()
  getMobiltyMarkers()
  })

/**
 * function that listen to each button, create the array with the selected values and update the json
 * @type {Array}
 */
$(function() {
    //Mobility buttons
    $("#automobile").click(function () {
        mobilityArray($(this))
        updateJSON(mobilityArrays,'mobility')
    })
    $("#velo").click(function () {
        mobilityArray($(this))
        updateJSON(mobilityArrays,'mobility')
    })
    $("#aPied").click(function () {
        mobilityArray($(this))
        updateJSON(mobilityArrays,'mobility')
    })
    $("#autres").click(function () {
        mobilityArray($(this))
        updateJSON(mobilityArrays,'mobility')
    })
    $("#transportEnCommun").click(function () {
        mobilityArray($(this))
        updateJSON(mobilityArrays,'mobility')
    })
    $("#laboratoireMobile").click(function () {
        mobilityArray($(this))
        updateJSON(mobilityArrays,'mobility')
    })
    // Genre buttons
    $("#photoButton").click(function () {
        genreArray($(this))
        updateJSON(genreArrays,'genre')
    })
    $("#videoButton").click(function () {
        genreArray($(this))
        updateJSON(genreArrays,'genre')
    })
    $("#ecritButton").click(function () {
        genreArray($(this))
        updateJSON(genreArrays,'genre')
    })
    $("#dessinButton").click(function () {
        genreArray($(this))
        updateJSON(genreArrays,'genre')
    })
    $("#multimediaButtons").click(function () {
        genreArray($(this))
        updateJSON(genreArrays,'genre')
    })
    $("#autdioButton").click(function () {
        genreArray($(this))
        updateJSON(genreArrays,'genre')
    })
})




/**
 * function that create an new json object with the predefined keys
 * @type {Array}
 */

var jsonFilter = new Object()
jsonFilter.title= titleArrays
jsonFilter.genre= genreArrays
jsonFilter.authors = authorsArrays
jsonFilter.location = locationArrays
jsonFilter.mobility = mobilityArrays
jsonFilter.project = projetArrays
jsonFilter.keyword = keyWordArrays
jsonFilter.timeframe = timeArrays


/**
 * function that update the json and validate the key it needs to update
 * @array {Array}
 * @key{string}
 */
function updateJSON(array,key){
    if(key === 'title'){
        jsonFilter.title = array
    }
    else if (key === 'genre'){
        jsonFilter.genre = array
    }
    else if (key === 'authors'){
        jsonFilter.authors = array
    }
    else if (key === 'location'){
        jsonFilter.location = array
    }
    else if (key === 'mobility'){
        jsonFilter.mobility = array
    }
    else if (key === 'project'){
        jsonFilter.project = array
    }
    else if (key === 'keyword'){
        jsonFilter.keyword = array
    }
    else if (key === 'timeframe'){
        jsonFilter.timeframe = array
    }

}



/**
 * function that update the json everytime the slider is updated
 *
 */
// When the slider changes, update the tooltip (try to avoid update at load, not successful for the moment)
dateSlider.noUiSlider.on('update', function (values, handle) {
    tooltipInputs[handle].value = values[handle]
    timeArrays = [values[0],values[1]]
    updateJSON(timeArrays,'timeframe')

})
// Correction du bug du placeholder dans select2
$(document).ready(function () {
    // Correct bug to show placeholder
    $('.select2-search__field').css({'width': '100%'})
})