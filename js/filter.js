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
/* ATTEMPT TO Minimize the code -- failed
                  var   getGD = ""
                  var   getAD = ""
                  var   getKD = ""
                  var   getLD = ""

                  function getData(i,k){

                  getGD = featuresCollection.features[j].properties.story.genres[0].label
                  getAD = featuresCollection.features[j].properties.story.author.label
                  getKD = featuresCollection.features[j].properties.story.main_tag.label
                  getLD = featuresCollection.features[j].properties.story.main_location.label

                      for (var j = 0; j < featuresCollection.features.length; j++)
                        return i.push(k)
                      };

                  getData(genreData,getGD)
                  getData(authorData,getAD)
                  getData(keywordData,getKD)
                  getData(locationData,getLD)
*/

function getGenre (i) {
  for (var j = 0; j < featuresCollection.features.length; j++) { i.push(featuresCollection.features[j].properties.story.genres[0].label) }
};
getGenre(genreData)

function getAuthor (i) {
  for (var j = 0; j < featuresCollection.features.length; j++) { i.push(featuresCollection.features[j].properties.story.authors[0].label) }
};
getAuthor(authorData)

function getKeyword (i) {
  for (var j = 0; j < featuresCollection.features.length; j++) { i.push(featuresCollection.features[j].properties.story.main_tag.label) }
};
getKeyword(keywordData)

function getLocation (i) {
  for (var j = 0; j < featuresCollection.features.length; j++) { i.push(featuresCollection.features[j].properties.story.main_location.label) }
};
getLocation(locationData)

function getTitre (i) {
  for (var j = 0; j < featuresCollection.features.length; j++) { i.push(featuresCollection.features[j].properties.story.title) }
};
getTitre(titreData)

function getMobility (i) {
  for (var j = 0; j < featuresCollection.features.length; j++) { i.push(featuresCollection.features[j].properties.mobility) }
};
getMobility(mobilityData)

function getProject (i) {
  for (var j = 0; j < featuresCollection.features.length; j++) { i.push(featuresCollection.features[j].properties.projects) }
};
getProject(projectData)

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

$('#genreSearchBox').select2()
$('#authorSearchBox').select2()
$('#keywordSearchBox').select2()
$('#locationSearchBox').select2()
$('#titreSearchBox').select2()
$('#mobilitySearchBox').select2()
$('#projectSearchBox').select2()
/** * initializing select2 searchbox data ***/
/*******************************************/

// var selectedItems = []

function searchBoxGenre () {
  $('#genreSearchBox').select2(

    {
      placeholder: 'Filtrez par titre',
      multiple: true,
      allowClear: true,
      data: genreData.unique()
    }

   )
};
searchBoxGenre()

  /// //////////////////////////////////////////////////////////*/
/* POPULATE THE SELECT BOX WITH ALL THE VALUES
  var genreOptions = $("#genreSearchBox option");
  genreOptions.each(function() {
      selectedItems.push( $(this).val() );
  });

  $("#genreSearchBox").val(selectedItems).trigger("change"); */

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

function searchBoxMobility () {
  $('#mobilitySearchBox').select2(

    {
      placeholder: 'Filtrez par mobilité',
      multiple: true,
      allowClear: true,
      data: mobilityData.unique()
    }

   )
};

searchBoxMobility()
/* POPULATE THE SELECT BOX WITH ALL THE VALUES
  var mobilityOptions = $("#mobilitySearchBox option");
  mobilityOptions.each(function() {
      selectedItems.push( $(this).val() );
  });

  $("#mobilitySearchBox").val(selectedItems).trigger("change"); */
/// //////////////////////////////////////////////////////////////////////

/// //////////////////////////////////////////////////////////////////////

function searchBoxProject () {
  $('#projectSearchBox').select2(

    {
      placeholder: 'Filtrez par projets',
      multiple: true,
      allowClear: true,
      data: projectData.unique()
    }

   )
};

searchBoxProject()

/* POPULATE THE SELECT BOX WITH ALL THE VALUES
  var projectOptions = $("#projectSearchBox option");
  projectOptions.each(function() {
      selectedItems.push( $(this).val() );
  });

  $("#projectSearchBox").val(selectedItems).trigger("change"); */

/// //////////////////////////////////////////////////////////////////////

/** * retrieve searchbox selected data(s) ***/
/*******************************************/
var arraySelectors = []
/*
$('#authorSearchBox').on('change', function (e) {
  var selectValAuthorSearchBox = $(e.currentTarget).val()
  arraySelectors.push(selectValAuthorSearchBox)
  arrayTest(arraySelectors)
  // console.log(selectValAuthorSearchBox)
})

$('#keywordSearchBox').on('select2:select', function (e) {
  var selectValKeywordSearchBox = $(e.currentTarget).val()
  arraySelectors.push(selectValKeywordSearchBox)
  arrayTest(arraySelectors)
  // console.log(selectValKeywordSearchBox)
})
$('#locationSearchBox').on('select2:select', function (e) {
  var selectValLocationSearchBox = $(e.currentTarget).val()
  arraySelectors.push(selectValLocationSearchBox)
  arrayTest(arraySelectors)
//   console.log(selectValLocationSearchBox)
})
$('#titreSearchBox').on('select2:select', function (e) {
  var selectValTitreSearchBox = $(e.currentTarget).val()
  arraySelectors.push(selectValTitreSearchBox)
  arrayTest(arraySelectors)

//   console.log(selectValLocationSearchBox)
})


//   console.log(selectValLocationSearchBox)
})
$('#projectSearchBox').on('select2:select', function (e) {
  var selectValProjectSearchBox = $(e.currentTarget).val()
      arraySelectors.push(selectValProjectSearchBox)
      arrayTest(arraySelectors)
})
*/
// $(".select2-multiple").on("select2:unselect", function (e) { console.log("select2:unselect", e); });

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

function arrayRemover(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    }
    //console.log(array)
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

    if (el.length === undefined){
        titleGroup.clearLayers()
    }
    else if (el.length === 0){
        titleGroup.clearLayers()
    }
    else{
        titleGroup.clearLayers()
        arrayRemover(authorsArrays,el)
        updateJSON(authorsArrays,'authors')
        getTitleMarkers()
    }

    })

$('#titreSearchBox').on('select2:unselect', function (e) {
    var el = $(e.currentTarget).val()

    if (el.length === undefined){
        titleGroup.clearLayers()
    }
    else if (el.length === 0){
        titleGroup.clearLayers()
    }
    else {
        titleGroup.clearLayers()
        arrayRemover(authorsArrays, el)
        updateJSON(authorsArrays, 'authors')
        getTitleMarkers()
    }
    })

/**
 *
 * PROJECT
 *
 */

$('#projectSearchBox').on('change', function (e) {
    projetArrays= []
    projetArrays.push($(e.currentTarget).val())
    updateJSON(projetArrays,'project')
})
$('#locationSearchBox').on('change', function (e) {
    locationArrays= []
    locationArrays.push($(e.currentTarget).val())
    updateJSON(locationArrays,'location')
})
$('#keywordSearchBox').on('change', function (e) {
    keyWordArrays= []
    keyWordArrays.push($(e.currentTarget).val())
    updateJSON(keyWordArrays,'keyword')
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



    if (el.length === undefined){
        authorsGroup.clearLayers()
    }
    else if (el.length === 0){
        authorsGroup.clearLayers()
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

    if (el.length === undefined){
        authorsGroup.clearLayers()
    }
    else if (el.length === 0){
        authorsGroup.clearLayers()
    }
    else{
        authorsGroup.clearLayers()
        arrayRemover(authorsArrays,el)
        updateJSON(authorsArrays,'authors')
        getAuthorsMarkers()
    }
})

/**
 * function that listen to the Mobility buttons and push values to its specific array
 * @type {Array}
 */
function mobilityArray(e){
    var firedValue = e.val();
    if(e.hasClass('btn-active')){
        mobilityArrays.push(firedValue)
        //arrayTest(mobilityArrays)
    }
    else{
        //remove the existing occurence of the value in the master array
        for (var i = 0, j = 0; i < mobilityArrays.length; i++) {
            if (mobilityArrays[i] != firedValue)
                mobilityArrays[j++] = mobilityArrays[i];
        }
        mobilityArrays.length = j;
        updateJSON(mobilityArrays,'mobility')
        getMobiltyMarkers ()
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
        //arrayTest(genreArrays)
    }
    else{
        //remove the existing occurence of the value in the master array
        for (var i = 0, j = 0; i < genreArrays.length; i++) {
            if (genreArrays[i] != firedValue)
                genreArrays[j++] = genreArrays[i];
        }
        genreArrays.length = j;
        //arrayTest(genreArrays)
        updateJSON(genreArrays,'genre')
        console.log(jsonFilter)
        getGenreMarkers ()
    }
}

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
    //console.log(jsonFilter)
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
    //console.log(jsonFilter)
})
// Correction du bug du placeholder dans select2
$(document).ready(function () {
    // Correct bug to show placeholder
    $('.select2-search__field').css({'width': '100%'})
})