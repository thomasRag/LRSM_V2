
/********** MAP FUNCTIONS ***********/
var map = L.map('map',{ zoomControl: false }).setView([45.5314, -73.6750], 11);
new L.Control.Zoom({ position: 'topright' }).addTo(map);
var baseLayer1 = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
 })
 .addTo(map);

var group = L.layerGroup();
var filteredGroup = L.layerGroup();
var mainMarkers ;

setColor = {
 radius: 8,
 fillColor: get_random_color(),
 color: '#ffffff',
 weight: 1,
 opacity: 1,
 fillOpacity: 0.5

};

function get_random_color() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
   color += letters[Math.round(Math.random() * 15.66)];
  }
  return color;
 }

 function removeLayers(i) {
  map.removeLayer(i)
 };

/********** END MAP FUNCTIONS ***********/


/********** random functions******/

    //////////// Calendar function

    $(function() {

    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);

});

  ///////////End Calendar function



    // MODAL RELATED
     function openModal(){
       $("#myModal").modal('show')
       map.closePopup();
       }
    // MODAL RELATED
     // Revert back to main markers when modal is closed //
    document.getElementById("modalClose").onclick = function () { getMainMarkers() };


    // pan the popup to the center of the screen (if not popup will have a float position)
    map.on('popupopen', function (e) {
            /***** !! Auto Pan to the center of the popup ToolTip !! *****/
            var px = map.project(e.popup._latlng); // find the pixel location on the map where the popup anchor is
            px.y -= e.popup._container.clientHeight / 2; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
            map.panTo(map.unproject(px), {animate: true}); // pan to new center
   });

/////////////// Retrieve by extend function /////////////////
   map.on('moveend ', function() {
      $("#arraySelectors").empty();
    // Construct an empty list to fill with onscreen markers.
    var inBounds = [];
    // Get the map bounds - the top-left and bottom-right locations.
    bounds = map.getBounds();

    // For each marker, consider whether it is currently visible by comparing
    // with the current map bounds.
    mainMarkers.eachLayer(function(marker) {
        if (bounds.contains(marker.getLatLng())) {
            inBounds.push(marker.feature.properties.story.id)
          ;
        }
    });

    for (i = 0; i < inBounds.length; i++) {
      var liContainers = $('<li class="list-group-item col-md-12"></li>')
      var aContainers = $('<a href="#" class="text_info"></a>')
      aContainers.append(inBounds[i])
      liContainers.append(aContainers);
      $('#arraySelectors').append(liContainers);}
    // Display a list of markers.
});
/////////////// END Retrieve by extend function /////////////////



/**********end random functions******/




/********** GET FILTERED MARKERS OVER THE SPECIFIC STORY ID *********/

function getFilterMarkers (i){
  filteredGroup.clearLayers();

     filterMarkers = L.geoJSON(featuresCollection,{

        // filter for the specific id of the click main marker
         filter:          function(feature, layer) {
          for (var j = 0 ; j < i ; j++){
           if (feature.properties.story['id'] == i){
           	console.log(feature.properties.story['id'] , i)
            return true}
        }},

          pointToLayer: function(feature, latlng) {
             label = String(feature.properties.order)
           return L.circleMarker(latlng, setColor).bindTooltip(label, {permanent: true, opacity: 0.7}).openTooltip(); //, style(feature)); //,styled(feature));
          },

          // on each feature call the modal and populate it with the specific related information gathered in the geojson
          onEachFeature: modalPopulate

    }).addTo(map)


  // Change container class in to outfocus if
  $('div#container').addClass("inFocus");


  // remove the main markers
  group.clearLayers();
  // add the filteredMarkers to the filteredGroup
  filteredGroup.addLayer(filterMarkers).addTo(map)
  // fit bounds of the filtered specifici markers
  map.fitBounds(filterMarkers.getBounds().pad(Math.sqrt(2) / 2))

}

/********** END FILTER MARKER FUNCTIONS BY ID *********/



/********** FUNCTION TO DISPLAY MAIN MARKERS *********/

     function getMainMarkers(){
       // Clear previously filtered markers
       filteredGroup.clearLayers();


     	 mainMarkers = L.geoJSON(featuresCollection,{
         // Filter properties main = true
         filter: function(feature, layer) {
           if(feature.properties.main === true)
           return true
         },
         // Display main markers as CircleMarkers
          pointToLayer: function(feature, latlng) {
             label = String(feature.properties.story.id)
           return L.circleMarker(latlng, setColor).bindTooltip(label, {permanent: true, opacity: 0.7}).openTooltip();
    		},

          // Call function onEachFeature1 (return)
          onEachFeature: onEachFeature

        })


     group.addLayer(mainMarkers).addTo(map)
     map.fitBounds(mainMarkers.getBounds())



     }

     getMainMarkers()

/********** FUNCTION TO DISPLAY MAIN MARKERS *********/

  function onEachFeature(feature, layer) {

      // Create HTML POP UP //
      var customPopup ='<div id="popUp" class="card mb-3" style="max-width: 20rem;">  '
      customPopup = customPopup + '<div id="mediaHeader" class="card-header">'
      customPopup = customPopup + '<div id="textHeader" class="text-center"> <b>Multimedia</b> </div>'
      customPopup = customPopup + '</div> '
      customPopup = customPopup + '<div id="mediaIcon" class="">'
      customPopup = customPopup + '<img id="mediaIconImg" class="rounded-circle" src="img/Icon_Multimedia.png"  width="40px"/>'
      customPopup = customPopup + '</div>'
      customPopup = customPopup + '<a href="javascript:getFilterMarkers('+feature.properties.story['id']+'),openModal()"><img id="popUpImg" class="card-img-top" src="img/test.jpg" alt="Card image cap">'
      customPopup = customPopup + '<div id="popUpFooter" class="card-footer pl-1 mt-1 pt-1 mb-0 pb-0">'
      customPopup = customPopup + '<h5 id="popUpTitle" class="mt-0"> Titre du récit </h5>'
      customPopup = customPopup + '<p id="popUpAuthor" class="mt-1 pl-1 mb-0 pb-1">Nom de l\'auteur</p>'
      customPopup = customPopup +  '</div></a>'
      customPopup = customPopup +  '</div></div>'

      // specify popup class
      var customOptions =
          {'className' : 'custom'}
      // bind html code and class options to the popup
      layer.bindPopup(customPopup,customOptions)

    };


/************** FUNCTION MODAL POPULATE  *****************/

function modalPopulate (feature,layer){

// CREATE DYNAMICALLY THE HTML CODE TO POPULATE THE MODAL SCROLL BY CHAPTER SECTION OF THE STORIES
  ///////////////////////////////////////////////////////////////
          var chapter = $('<p></p><row chapter><div class="col-md-10"> <span id="elementNumber"> <h4>Élément #'+feature.properties['order']
            +'   </h4> <span>       </div><div class="col-md-10"><span> <h5> Emplacement | Date </h5>  </span></div></div><div class="row"></div><div class="row">'
            +'<div class="col-md-10 mx-auto d-inline-block mt-2 pt-2 text-justify"></div> </div><hr></div>',
            {
                text: feature.properties['order'],
                class: 'chapter-header'
                });

          var container = $('<div></div>', {
                       id: 'container' + feature.properties['order'],
                       class: 'image-container'
                     });

          var description = $('<p> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? </p>', {
             class: 'description'
           });
     //////////////////////END HTML ////////////////////////////////

         // append the html code to the container itself
         container.append(chapter).append(description);
         $('#modalBodyContent').append(container);

/*******************************************************/


         // SCROLL BY CHAPTER RELATED
         var imageContainerMargin = 300;  // Margin + padding

         // SCROLL BY CHAPTER RELATED
         // This watches for the scrollable container
         var scrollPosition = 0;
         $('div#contents').scroll(function() {
           scrollPosition = $(this).scrollTop();
         });

         var i;
         var areaTop = -100;
         var areaBottom = 0;
         // Calculating total height of blocks above active
         for (i = 1; i < feature.properties['order']; i++) {
           areaTop += $('div#container' + i).height() + imageContainerMargin;
         }
         areaBottom = areaTop + $('div#container' + feature.properties['order']).height();


         // Check if the bloc (or chapter) is active by check its positions y in the container
         $('#modalBodyContent').scroll(function() {
            //console.log(areaTop,areaBottom )
             if ($(this).scrollTop() >= areaBottom && $(this).scrollTop() < areaTop) {
               //add special class infocus for the active block (chapter)
               $('.image-container').removeClass("inFocus").addClass("outFocus");
               $('div#container' + feature.properties['order']).addClass("inFocus").removeClass("outFocus");
               // fly to the specific marker related to the chapter
               map.flyTo([feature.geometry.coordinates[1], feature.geometry.coordinates[0] ], 18);
           }
         });

         // Click on a geometry = automaticly scroll to the right block (chapter)
         layer.on('click', function() {
            $("#modalBodyContent").animate({scrollTop: areaTop + "px"});
            });
          }
