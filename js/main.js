var map = L.map('map',{ zoomControl: false }).setView([45.5314, -73.6750], 11);

new L.Control.Zoom({ position: 'topright' }).addTo(map);

var baseLayer1 = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
 })
 .addTo(map);





console.log(featuresCollection)

var group = L.layerGroup();
var filteredGroup = L.layerGroup();



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

/********** GET FILTERED MARKERS OVER THE SPECIFIC STORY ID ******/


var authors = $("#authorSearchBox").val();




function getFilterMarkers (authors){

  filteredGroup.clearLayers();
     filterMarkers = L.geoJSON(featuresCollection,{
         filter:
         function(feature) {
           console.log(authors)
          //for (var j = 0 ; j < authors.length ; j++){
           if (feature.properties.story.author.label === authors){
            return true}

        },

          pointToLayer: function(feature, latlng) {
           return L.circleMarker(latlng, setColor) //, style(feature)); //,styled(feature));
          },

          onEachFeature: function(feature, layer) {
           //layer.bindPopup('<h1>'+marker.properties.title+'</h1><p>'+marker.properties.auteurs+'</p>'+'</h1><p>'+marker.properties.id+'</p><a href=www.google.com>Explorer le récit</a>');
           //console.log(feature.properties.media)
           layer.bindPopup('<div><a href="#" class="speciallink"><h2>'
            +feature.properties.story.author.label +'</h2></div>')

          }

    }).addTo(map)


    group.clearLayers();
    filteredGroup.addLayer(filterMarkers).addTo(map)
   //map.fitBounds(filterMarkers.getBounds())

}


 function getMainMarkers(){

 	 introMarker = L.geoJSON(featuresCollection,{

    /* filter: masterFilter,*/

      pointToLayer: function(feature, latlng) {
       return L.circleMarker(latlng, setColor) //, style(feature)); //,styled(feature));
      },

      onEachFeature: function(feature, layer) {

    var customPopup = '<div id="popUp" class="card mb-3" style="max-width: 20rem;">  '
    customPopup = customPopup + '<div id="mediaHeader" class="card-header">'
    customPopup = customPopup + '<div id="textHeader" class="text-center"> <b>Multimedia</b> </div>'
    customPopup = customPopup + '</div> '
    customPopup = customPopup + '<div id="mediaIcon" class="">'
    customPopup = customPopup + '<img id="mediaIconImg" class="rounded-circle" src="img/Icon_Multimedia.png"  width="40px"/>'
    customPopup = customPopup + '</div>'
    customPopup = customPopup + '<img id="popUpImg" class="card-img-top" src="img/test.jpg" alt="Card image cap">'
    customPopup = customPopup + '<div id="popUpFooter" class="card-footer pl-1 mt-1 pt-1 mb-0 pb-0">'
    customPopup = customPopup + '<h5 id="popUpTitle" class="mt-0"> Titre du récit </h5>'
    customPopup = customPopup + '<p id="popUpAuthor" class="mt-1 pl-1 mb-0 pb-1">Nom de l\'auteur</p>'
    customPopup = customPopup +  '</div>'
    customPopup = customPopup +  '</div></div>'




    // specify popup options
    var customOptions =
        {
        'className' : 'custom'
        }
       layer.bindPopup(customPopup,customOptions)
      }
    })


 group.addLayer(introMarker).addTo(map)
 map.fitBounds(introMarker.getBounds())


 }

 getMainMarkers()
