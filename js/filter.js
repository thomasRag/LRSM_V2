/**** LOOP THROUGHT EVERY CATEGORY TO FILTER THE DATA *****/
/*******************************************/

/**
           * Remove null values from the Fulcrum API Endpoint
           *
           **/

          (function removeNull(o) {
              for (var key in o) {
                  if (null === o[key]) o[key] = '';
                  if (typeof o[key] === 'object') removeNull(o[key]);
              }
          })(featuresCollection);


    /* initialize arrays */


                  genre_Data = [];
                  author_Data = [];
                  keyword_Data = [];
                  location_Data = [];
                  titre_Data = [];
                  mobility_Data =[];
                  project_Data =[];
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

                  getData(genre_Data,getGD)
                  getData(author_Data,getAD)
                  getData(keyword_Data,getKD)
                  getData(location_Data,getLD)
*/

                  function getGenre(i){
                      for (var j = 0; j < featuresCollection.features.length; j++)
                         i.push(featuresCollection.features[j].properties.story.genres[0].label)
                      };
                  getGenre (genre_Data)

                  function getAuthor(i){
                      for (var j = 0; j < featuresCollection.features.length; j++)
                         i.push(featuresCollection.features[j].properties.story.authors[0].label)
                      };
                  getAuthor (author_Data)

                  function getKeyword(i){
                      for (var j = 0; j < featuresCollection.features.length; j++)
                         i.push(featuresCollection.features[j].properties.story.main_tag.label)
                      };
                  getKeyword (keyword_Data)

                  function getLocation(i){
                      for (var j = 0; j < featuresCollection.features.length; j++)
                         i.push(featuresCollection.features[j].properties.story.main_location.label)
                      };
                  getLocation (location_Data)

                  function getTitre(i){
                      for (var j = 0; j < featuresCollection.features.length; j++)
                         i.push(featuresCollection.features[j].properties.title)
                      };
                  getTitre (titre_Data)

                  function getMobility(i){
                      for (var j = 0; j < featuresCollection.features.length; j++)
                         i.push(featuresCollection.features[j].properties.story.id)
                      };
                  getMobility (mobility_Data)

                  function getProject(i){
                      for (var j = 0; j < featuresCollection.features.length; j++)
                         i.push(featuresCollection.features[j].properties.story.id)
                      };
                  getProject (project_Data)


/* function that retrive unique objects from an array */
                  Array.prototype.unique = function() {
                    return this.filter(function (value, index, self) {
                      return self.indexOf(value) === index;
                    });
                  };


/**** Always capitalize the first letter *****/
/*******************************************/
/*
  for(var i = 0 ; i < genre_Data.length ; i++){
    genre_Data[i] = genre_Data[i].charAt(0).toUpperCase()+ genre_Data[i].substr(1);;

  };
  for(var i = 0 ; i < author_Data.length ; i++){
      author_Data[i] = author_Data[i].charAt(0).toUpperCase()+ author_Data[i].substr(1);;

  };

  for(var i = 0 ; i < keyword_Data.length ; i++){
  keyword_Data[i] = keyword_Data[i].charAt(0).toUpperCase()+ keyword_Data[i].substr(1);;

  };

  for(var i = 0 ; i < location_Data.length ; i++){
      location_Data[i] = location_Data[i].charAt(0).toUpperCase()+ location_Data[i].substr(1);;

  };

*/

/***** initialize select2 *******/
/*******************************************/

  $("#genreSearchBox").select2();
  $("#authorSearchBox").select2();
  $("#keywordSearchBox").select2();
  $("#locationSearchBox").select2();
  $("#titreSearchBox").select2();
  $("#mobilitySearchBox").select2();
  $("#projectSearchBox").select2();
/*** initializing select2 searchbox data ***/
/*******************************************/

  var selectedItems = [];


  function searchBoxGenre() {
   $('#genreSearchBox').select2(

    {
      placeholder: "Choississez un titre",
      multiple: true,
      allowClear: true,
      data: genre_Data.unique()
        }

   )
 };
  searchBoxGenre()

  /////////////////////////////////////////////////////////////*/
/* POPULATE THE SELECT BOX WITH ALL THE VALUES
  var genreOptions = $("#genreSearchBox option");
  genreOptions.each(function() {
      selectedItems.push( $(this).val() );
  });*/

  $("#genreSearchBox").val(selectedItems).trigger("change");


  function searchBoxAuthor() {
   $('#authorSearchBox').select2(

    {
      placeholder: "Auteur",
      multiple: true,
      allowClear: true,
     data:   author_Data.unique()
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

/*///////////////////////////////////////////////////////////////////////
/* POPULATE THE SELECT BOX WITH ALL THE VALUES
  $("#authorSearchBox").val(selectedItems).change(function() {
    //console.log($("#authorSearchBox").val())
      getFilterMarkers ($("#authorSearchBox").val());
});

////////////////////////////////////////////////////////////////////////*/

  function searchBoxKeyword() {
   $('#keywordSearchBox').select2(

    {
     data:   keyword_Data.unique()
    }
   )
 };
  searchBoxKeyword()

/* POPULATE THE SELECT BOX WITH ALL THE VALUES
  var keywordOptions = $("#keywordSearchBox option");
  keywordOptions.each(function() {
      selectedItems.push( $(this).val() );
  });

  $("#keywordSearchBox").val(selectedItems).trigger("change");*/

/////////////////////////////////////////////////////////////////////////

  function searchBoxLocation() {
   $('#locationSearchBox').select2(

    {
     data:   location_Data.unique()
    }
   )
 };
  searchBoxLocation()

/* POPULATE THE SELECT BOX WITH ALL THE VALUES
  var lcoationOptions = $("#locationSearchBox option");
  lcoationOptions.each(function() {
      selectedItems.push( $(this).val() );
  });

  $("#locationSearchBox").val(selectedItems).trigger("change");*/

/////////////////////////////////////////////////////////////////////////

  function searchBoxTitre() {
   $('#titreSearchBox').select2(

    {
      placeholder: "Filtrez par titre",
      multiple: true,
      allowClear: true,
      data: titre_Data.unique()
        }

   )
 };

  searchBoxTitre()

/* POPULATE THE SELECT BOX WITH ALL THE VALUES
  var titreOptions = $("#titreSearchBox option");
  titreOptions.each(function() {
      selectedItems.push( $(this).val() );
  });

  $("#titreSearchBox").val(selectedItems).trigger("change");*/
/////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////

  function searchBoxMobility() {
   $('#mobilitySearchBox').select2(

    {
      placeholder: "Filtrez par mobilité",
      multiple: true,
      allowClear: true,
      data: mobility_Data.unique()
        }

   )
 };

  searchBoxMobility()
/* POPULATE THE SELECT BOX WITH ALL THE VALUES
  var mobilityOptions = $("#mobilitySearchBox option");
  mobilityOptions.each(function() {
      selectedItems.push( $(this).val() );
  });

  $("#mobilitySearchBox").val(selectedItems).trigger("change");*/
/////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////

function searchBoxProject() {
   $('#projectSearchBox').select2(

    {
      placeholder: "Filtrez par projets",
      multiple: true,
      allowClear: true,
      data: project_Data.unique()
        }

   )
 };

  searchBoxProject()


/* POPULATE THE SELECT BOX WITH ALL THE VALUES
  var projectOptions = $("#projectSearchBox option");
  projectOptions.each(function() {
      selectedItems.push( $(this).val() );
  });

  $("#projectSearchBox").val(selectedItems).trigger("change");*/

/////////////////////////////////////////////////////////////////////////


/*** retrieve searchbox selected data(s) ***/
/*******************************************/
var arraySelectors = [];

$("#genreSearchBox").on("select2:select", function(e) {
 a = select_valGenreSearchBox = $(e.currentTarget).val();
  arraySelectors.push(a)
  arrayTest(arraySelectors)
  // console.log(select_valGenreSearchBox)
});

$("#authorSearchBox").on("select2:select", function(e) {
a = select_valAuthorSearchBox = $(e.currentTarget).val();
arraySelectors.push(a)
arrayTest(arraySelectors)
  // console.log(select_valAuthorSearchBox)
});

$("#keywordSearchBox").on("select2:select", function(e) {
a = select_valKeywordSearchBox = $(e.currentTarget).val();
arraySelectors.push(a)
arrayTest(arraySelectors)
  // console.log(select_valKeywordSearchBox)
});
$("#locationSearchBox").on("select2:select", function(e) {
a = select_valLocationSearchBox = $(e.currentTarget).val();
arraySelectors.push(a)
arrayTest(arraySelectors)
//   console.log(select_valLocationSearchBox)
});
$("#titreSearchBox").on("select2:select", function(e) {
a = select_valTitreSearchBox = $(e.currentTarget).val();
arraySelectors.push(a)
arrayTest(arraySelectors)

//   console.log(select_valLocationSearchBox)
});
$("#mobilitySearchBox").on("select2:select", function(e) {
a = select_valMobilitySearchBox = $(e.currentTarget).val();
arraySelectors.push(a)
arrayTest(arraySelectors)

//   console.log(select_valLocationSearchBox)

});
$("#projectSearchBox").on("select2:select", function(e) {
a = select_valProjectSearchBox = $(e.currentTarget).val();
//   console.log(select_valLocationSearchBox)
arraySelectors.push(a)
arrayTest(arraySelectors)

});




$(".select2-multiple").on("select2:unselect", function () { arraySelectors = [] });
//$(".select2-multiple").on("select2:unselect", function (e) { console.log("select2:unselect", e); });

// function search for titles


/*************** function test to retrieve list of values from the select boxes and pass them into the LIST li containers **/
//retrive multidimentional arrays
function arrayTest(i){
console.log(i)
}
