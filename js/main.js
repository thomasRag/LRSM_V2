var map = L.map('map',{ zoomControl: false }).setView([45.5314, -73.6750], 11);

new L.Control.Zoom({ position: 'topright' }).addTo(map);

var baseLayer1 = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
 })
 .addTo(map);

console.log(featuresCollection)

var group = L.layerGroup();



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

function getFilterMarkers (j){

   filterMarkers = L.geoJSON(featuresCollection,{

     filter: function(feature, layer) {
      return feature.properties.story.id === j},

      pointToLayer: function(feature, latlng) {
       return L.circleMarker(latlng, setColor) //, style(feature)); //,styled(feature));
      },

      onEachFeature: function(feature, layer) {
       //layer.bindPopup('<h1>'+marker.properties.title+'</h1><p>'+marker.properties.auteurs+'</p>'+'</h1><p>'+marker.properties.id+'</p><a href=www.google.com>Explorer le récit</a>');
       console.log(feature.properties.media)
       layer.bindPopup('<div><a href="#" class="speciallink"><h2>'
        +feature.properties.title +'<a data-flickr-embed="true"  href="https://www.flickr.com/photos/thexplorer/1590316457/" title="Untitled"><img src="https://farm3.staticflickr.com/2214/1590316457_6e1aa70c12_q.jpg" width="150" height="150" alt="Untitled"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>')}




    }).addTo(map)


    removeLayers(group)
    map.fitBounds(filterMarkers.getBounds())

}


 function getMainMarkers(){

 	 introMarker = L.geoJSON(featuresCollection,{

     filter: function(feature, layer) {
      return feature.properties.main === true},

      pointToLayer: function(feature, latlng) {
       return L.circleMarker(latlng, setColor) //, style(feature)); //,styled(feature));
      },

      onEachFeature: function(feature, layer) {
       //layer.bindPopup('<h1>'+marker.properties.title+'</h1><p>'+marker.properties.auteurs+'</p>'+'</h1><p>'+marker.properties.id+'</p><a href=www.google.com>Explorer le récit</a>');

       layer.bindPopup($('<div><a href="#" class="speciallink"><h2>'
        +feature.properties.title + '</h2></a><iframe id="player1" src="https://player.vimeo.com/video/69426498?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=0&amp;api=1&amp;player_id=player1" width="100%" height="80%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe><div>').click(


        function() {

          getFilterMarkers(feature.properties.story.id),
          removeLayers(getFilterMarkers),
          $("#myModal").modal()

       })[0]);


      }

    })




 group.addLayer(introMarker).addTo(map)
 map.fitBounds(introMarker.getBounds())


 }

 getMainMarkers()
