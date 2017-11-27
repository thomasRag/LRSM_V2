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
  for (var j = 0; j < featuresCollection.features.length; j++) { i.push(featuresCollection.features[j].properties.title) }
};
getTitre(titreData)

function getMobility (i) {
  for (var j = 0; j < featuresCollection.features.length; j++) { i.push(featuresCollection.features[j].properties.story.id) }
};
getMobility(mobilityData)

function getProject (i) {
  for (var j = 0; j < featuresCollection.features.length; j++) { i.push(featuresCollection.features[j].properties.story.id) }
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

$('#genreSearchBox').on('select2:select', function (e) {
  var selectValGenreSearchBox = $(e.currentTarget).val()
  arraySelectors.push(selectValGenreSearchBox)
  arrayTest(arraySelectors)
  // console.log(selectValGenreSearchBox)
})

$('#authorSearchBox').on('select2:select', function (e) {
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
$('#mobilitySearchBox').on('select2:select', function (e) {
  var selectValMobilitySearchBox = $(e.currentTarget).val()
  arraySelectors.push(selectValMobilitySearchBox)
  arrayTest(arraySelectors)

//   console.log(selectValLocationSearchBox)
})
$('#projectSearchBox').on('select2:select', function (e) {
  var selectValProjectSearchBox = $(e.currentTarget).val()
//   console.log(selectValLocationSearchBox)
  arraySelectors.push(selectValProjectSearchBox)
  arrayTest(arraySelectors)
})

// Correction du bug du placeholder
$(document).ready(function () {
    // Correct bug to show placeholder
  $('.select2-search__field').css({'width': '100%'})
})

$('.select2-multiple').on('select2:unselect', function () { arraySelectors = [] })
// $(".select2-multiple").on("select2:unselect", function (e) { console.log("select2:unselect", e); });

// function search for titles

/** ************* function test to retrieve list of values from the select boxes and pass them into the LIST li containers **/
// retrive multidimentional arrays
function arrayTest (i) {
  console.log(i)
}
