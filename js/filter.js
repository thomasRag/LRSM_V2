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
$('#mobilitySearchBox').on('select2:select', function (e) {
  var selectValMobilitySearchBox = $(e.currentTarget).val()
  arraySelectors.push(selectValMobilitySearchBox)
  arrayTest(arraySelectors)

//   console.log(selectValLocationSearchBox)
})
$('#projectSearchBox').on('select2:select', function (e) {
  var selectValProjectSearchBox = $(e.currentTarget).val()
      arraySelectors.push(selectValProjectSearchBox)
      arrayTest(arraySelectors)
})
*/

var megaArray =[]
$('.select2-multiple').on('change', function (e) {
    var arrayValues= []
    arrayValues.push($(e.currentTarget).val())
    console.log(arrayValues)
})
// $(".select2-multiple").on("select2:unselect", function (e) { console.log("select2:unselect", e); });

/**
 * Loop through all buttons , validate if they are already in the aray and push the value in master array
 */

/*function that wrap all funcion in one function but it is WIP

function test(){
$('.btn-filter').children('button').each(function () {
    var fired_button = $(this).val();
    buttonsArray.push(fired_button)

    if($(this).hasClass('btn-active')){
        arraySelectors.push(fired_button)
        arrayTest(arraySelectors)
    }
    else{
        //remove the existing occurence of the value in the master array
        for (var i = 0, j = 0; i < arraySelectors.length; i++) {
            if (arraySelectors[i] != fired_button)
                arraySelectors[j++] = arraySelectors[i];
        }
        arraySelectors.length = j;
        arrayTest(arraySelectors)
    }
});
}

$("#automobile").click(function() {
    test()
});*/
var mobilityArrays = []
var genreArrays = []


function mobilityArray(e){
    var fired_button = e.val();
    if(e.hasClass('btn-active')){
        mobilityArrays.push(fired_button)
        arrayTest(mobilityArrays)
    }
    else{
        //remove the existing occurence of the value in the master array
        for (var i = 0, j = 0; i < mobilityArrays.length; i++) {
            if (mobilityArrays[i] != fired_button)
                mobilityArrays[j++] = mobilityArrays[i];
        }
        mobilityArrays.length = j;
        arrayTest(mobilityArrays)
    }
}
function genreArray(e){
    var fired_button = e.val();
    if(e.hasClass('btn-active')){
        genreArrays.push(fired_button)
        arrayTest(genreArrays)
    }
    else{
        //remove the existing occurence of the value in the master array
        for (var i = 0, j = 0; i < genreArrays.length; i++) {
            if (genreArrays[i] != fired_button)
                genreArrays[j++] = genreArrays[i];
        }
        genreArrays.length = j;
        arrayTest(genreArrays)
    }
}

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

/*next update arrays everytime there is a change on the buttonsArray*/

var jsonFilter = new Object()
jsonFilter.title=[]
jsonFilter.genre=genreArrays
jsonFilter.authors=[]
jsonFilter.location=[]
jsonFilter.mobility = mobilityArrays
jsonFilter.project=[]
jsonFilter.keyword=[]
jsonFilter.timeframe=

updateJSON =(
     function(array,key){
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
        else if (key === 'tiprojectle'){
            jsonFilter.project = array
        }
        else if (key === 'keyword'){
            jsonFilter.keyword = array
        }
        else if (key === 'timeframe'){
           jsonFilter.timeframe = array
        }
        console.log(jsonFilter)
    })()


/** ************* function test to retrieve list of values from the select boxes and pass them into the LIST li containers **/
// retrive multidimentional arrays
function arrayTest (i) {
  console.log(i)
}

// When the slider changes, update the tooltip
dateSlider.noUiSlider.on('update', function (values, handle) {
    tooltipInputs[handle].value = values[handle]
    var myArray = timeArray.push(values[0],values[1])
    updateJSON(myArray,'timeFrame')
    console.log(values[0],values[1])
})

// Correction du bug du placeholder dans select2
$(document).ready(function () {
    // Correct bug to show placeholder
    $('.select2-search__field').css({'width': '100%'})
})