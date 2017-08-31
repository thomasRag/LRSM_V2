
$.fn.select2.defaults.set("theme", "bootstrap");
$.fn.select2.defaults.set("width", "80%");

$('#ex1').slider({
	formatter: function(value) {
		return 'Current value: ' + value;
	}
});



var map = L.map('mapid').setView([45.5314, -73.6750], 11);
var filter;
var stories = [];
var story = [];
var genre= [];



var baseLayer1 = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
 })
 .addTo(map);

var baseLayer2 = L.tileLayer('http://{s}.tiles.mapbox.com/v3/gvenech.m13knc8e/{z}/{x}/{y}.png', {
 maxZoom: 18,
 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
})

var baseLayer3 = L.tileLayer('http://{s}.tiles.mapbox.com/v3/gvenech.m13knc8e/{z}/{x}/{y}.png', {
 maxZoom: 18,
 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
})


var group = L.layerGroup();
var groupFilter = L.layerGroup();
var introMarker = L.geoJSON();
var markerCluster = L.markerClusterGroup();

var getStory = function renderStory(story) {

 marker = story.geo_infos.features[0]
 allMarker = story.geo_infos.features
  //mainMarker = story.geo_infos.features.filter(function (el){return el.properties.main})[0];
 mainMarker = story.geo_infos.features.filter(function(el) {
  return el.properties.main
 });
 marker.properties.texte = story.texte
 marker.properties.id = story.id;
 marker.properties.title = story.title.rendered;
 marker.properties.auteurs = story.acf.auteurs.map(function(el) {
  return (el.post_title);
 });
 marker.properties.storyLink = story.link;
 marker.properties.ptagsID = story.primary_tag;
 marker.properties.stagsID = story.secondary_tag;



 marker.properties.genre = story.genre.name
 marker.properties.projectsID = story.project;

 _storyID = String(marker.properties.id)
 _storyTitle = marker.properties.title
 _auteurs = marker.properties.auteurs
 _genres = marker.properties.genre
 _pTags = marker.properties.ptagsID
 _sTags = marker.properties.stagsID
 _genre = marker.properties.genre


function get_random_color() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
   color += letters[Math.round(Math.random() * 15.66)];
  }
  return color;
 }

 setColor = {
  radius: 8,
  fillColor: get_random_color(),
  color: '#ffffff',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8

 };



 introMarker = L.geoJSON(mainMarker, {

  pointToLayer: function(feature, latlng) {
   return L.circleMarker(latlng, setColor) //, style(feature)); //,styled(feature));
  },
  onEachFeature: function(feature, layer) {
   //layer.bindPopup('<h1>'+marker.properties.title+'</h1><p>'+marker.properties.auteurs+'</p>'+'</h1><p>'+marker.properties.id+'</p><a href=www.google.com>Explorer le récit</a>');

   layer.bindPopup($('<div><a href="#" class="speciallink"><h2>'
    + marker.properties.title + '</h2></a><iframe id="player1" src="https://player.vimeo.com/video/69426498?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=0&amp;api=1&amp;player_id=player1" width="100%" height="80%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe><div>').click(


    function() {
    getFilterStories(story.id),
    $("#myModal").modal()

   })[0]);


  }
 })



 function searchBoxGenre() {
  $('#genreSearchBox').select2(

   {
    data: _genre
   }

  )
 }
 searchBoxGenre()

 function searchBoxAuteur() {
  $('#auteurSearchBox').select2(

   {
    data: _auteurs
   }

  )
 }
 searchBoxAuteur()


 function searchBoxKeyWord() {
  $('#keywordSearchBox').select2(

   {
    data: _pTags
   }

  )
 }
 searchBoxKeyWord()

 function searchBoxLieu() {
  $('#lieuSearchBox').select2(

   {
    data: _storyID
   }

  )
 }
 searchBoxLieu()

// markerCluster.addLayer(introMarker)
 // map.addLayer(introMarker)
 group.addLayer(introMarker).addTo(map)
} //// End of getStory ///


$("#genreSearchBox").on("select2:select", function(e) {
 select_valgenreSearchBox = $(e.currentTarget).val();





 console.log(select_valgenreSearchBox)



});

$("#auteurSearchBox").on("select2:select", function(e) {
 select_valauteurSearchBox = $(e.currentTarget).val();

 	function pnicoFilter(marker) {
  if (marker.properties.auteurs === select_valauteurSearchBox) return true
}

 function nico(){

 	 introMarker = L.geoJSON(mainMarker, {

 	 	filter: function(feature, layer) {
	return pnicoFilter;
},
  pointToLayer: function(feature, latlng) {
   return L.circleMarker(latlng, setColor) //, style(feature)); //,styled(feature));
  },
  onEachFeature: function(feature, layer) {
  layer.bindPopup('<h1>'+marker.properties.title+'</h1><p>'+marker.properties.auteurs+'</p>'+'</h1><p>'+marker.properties.id+'</p><a href=www.google.com>Explorer le récit</a>');




  }
 }).addTo(map)


 	 map.fitBounds(introMarker.getBounds())

 }

 nico()


 console.log(select_valauteurSearchBox)


 });

$("#keywordSearchBox").on("select2:select", function(e) {
 select_valkeywordSearchBox = $(e.currentTarget).val();
 console.log(select_valkeywordSearchBox)});

$("#lieuSearchBox").on("select2:select", function(e) {
 select_vallieuSearchBox = $(e.currentTarget).val();
 console.log(select_vallieuSearchBox)});





function toggleLayer() {
 var baseMaps = {
  'Carto Dark  ': baseLayer1,
  'Carto Light  ': baseLayer3,
  'MapBox Colorfull ': baseLayer2
 };

 L.control.layers(baseMaps).addTo(map);
}
toggleLayer();
//TODO REMOVE ALL LAYER !
function removeGroupLayer() {
 map.removeLayer(group)
};

function removeIntroMarker() {
 map.removeLayer(geojmap)
};

function addIntroMarker() {
 map.addLayer(geojmap)
};

function removeFilterLayer() {
 map.removeLayer(markerCluster)
};

function removeFiltermarker() {
 map.removeLayer(_filteredMarker)
};

function addGroupLayer() {
 //map.removeLayer(groupFilter)
 map.addLayer(group)


}

    $(function() {
          $('#toggle-one').change(function() {
             map.removeLayer(group)
             map.addLayer(geojmap)
          })
        })



function getStories() {

 /*$.getJSON('http://staging-lrsm.anagraph.io/wp-json/wp/v2/story?per_page=100',
function(stories) {
   stories.map(getStory);
  }

)*/


     $.when(
        $.getJSON('http://staging-lrsm.anagraph.io/wp-json/wp/v2/story?per_page=100'),
        $.getJSON('http://staging-lrsm.anagraph.io/wp-json/wp/v2/genre')
    ).done(function(storyRequest,genreRequest){

        stories = storyRequest[0];
        genres = genreRequest[0];

        stories.map(function (story) {
            story.genre = genres.filter(function (genre) {
                return ($.inArray(genre.id, story.genre) !== -1);
            });
        });

		      stories.map(getStory)


		     geoJ=stories.map(function(geo){
		      	return geo.geo_infos
		      })

		   geojmap = L.geoJSON(geoJ);

		markerCluster.addLayer(geojmap)
		  //map.addLayer(markerCluster)


    });

}
getStories()



function getFilterStories(i) {

 $.getJSON('http://staging-lrsm.anagraph.io/wp-json/wp/v2/story/' + i,
  function(filterStories) {


   _setColor = {
     radius: 8,
     fillColor: 'purple',
     color: '#ffffff',
     weight: 1,
     opacity: 1,
     fillOpacity: 0.8

    },

    _marker = filterStories.geo_infos.features;
   _auteurs = filterStories.acf.auteurs.map(function(el) {
    return (el.post_title);
   });
   //_media_links = filterStories.acf.media_links.map(function(el) {return (el.link);});
   _media_links = filterStories.acf.media_links[0].link

   removeGroupLayer();

   _filteredMarker = L.geoJSON(_marker, {

    pointToLayer: function(feature, latlng) {
     return L.circleMarker(latlng, _setColor)
    },
    onEachFeature: function(feature, layer) {
     //layer.bindPopup('<h1>'+filterStories.title.rendered+'</h1><p>'+_auteurs+'</p>'+'</h1><p>'+filterStories.genre+'</p><a href= http://www.lrsm.ca > Explorer </a>')
     //layer.bindPopup('<div class="wrap"> <iframe class="frame" src="'+_media_links+'" frameborder="1" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>')
     layer.bindPopup('<iframe id="player1" src="https://player.vimeo.com/video/69426498?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=0&amp;api=1&amp;player_id=player1" width="200" height="150" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>')
    }
   }).addTo(map)

   map.fitBounds(_filteredMarker.getBounds())

   // TODO AJOUTER LE POPUP AUTOMATIQUE SUR LE MARQUEUR PRINCIPAL
   // AFFICHER LE RECIT DANS UNE PAGE DE COTÉ
   //_marker.openPopup();
  }


 )
}







function easyButton() {

 // TODO CHECK LE STATE A OFF DES LE DEPART, A ON PRESENTEMENT

 var resetButton = L.easyButton({
 id: 'resetButton',
  states: [{
   stateName: 'add-markers',
   icon: 'fa-reply-all',
   title: 'Retour au départ',
   onClick: function(control) {
   	removeFilterLayer()
   	//removeFiltermarker()
    addGroupLayer();
    map.setView([45.5314, -73.6750], 11);
   }
  }]
 })
 resetButton.addTo(map);



 var geoCoderButton = L.easyButton({
 id: 'geoCoderButton',
  states: [{
   stateName: 'Toggle Geocoder',
   icon: 'fa-search',
   title: 'Trouver un endroit',
   onClick: function(control) {
   	map.removeLayer(group) ;
   map.addLayer(markerCluster) ;
    map.setView([45.5314, -73.6750], 8);
   }
  }]

 })
 geoCoderButton.addTo(map);

var removeGroupLayersButton = L.easyButton({
 id: 'removeGroupLayersButton',
  states: [{
   stateName: 'Toggle Localisateur',
   icon: 'fa-map-marker',
   title: 'Se positionner',
   onClick: function(control) {
   removeGroupLayer();

   }
  }]

 })
 removeGroupLayersButton.addTo(map);




 var removeIntroMarkersButton = L.easyButton({
 id: 'removeIntroMarkersButton',
  states: [{
   stateName: 'Toggle Localisateur',
   icon: 'fa-arrows-alt',
   title: 'Enlever tous les markers',
   onClick: function(control) {
   removeIntroMarker();

   }
  }]

 })
 removeIntroMarkersButton.addTo(map);

 var modalButton = L.easyButton({
 id: 'modalButton',
  states: [{
   stateName: 'Toggle Localisateur',
   icon: 'fa-map-o',
   title: 'Montrer le modal page',
   onClick: function(control) {

   	$("#myModal").modal()


   }
  }]

 })
 modalButton.addTo(map);


  var shareButton = L.easyButton({
 id: 'shareButton',
  states: [{
   stateName: 'Toggle Localisateur',
   icon: 'fa-share-alt',
   title: 'Partager',
   onClick: function(control) {

   	$("#myModal").modal()


   }
  }]

 })
 shareButton.addTo(map);





}



easyButton()
