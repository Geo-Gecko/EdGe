var map = L.map('map', {
  minZoom: 7.2
}).setView([1.2, 32.24], 5);


function setParent(el, newParent) {
  newParent.appendChild(el);
}

var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
}).addTo(map);

// var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// 	maxZoom: 19,
// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

var geojsonMarkerOptions = {
  radius: 2,
  fillColor: "#07528B",
  color: "#000",
  weight: 0.6,
  opacity: 1,
  fillOpacity: 1
};

var schools_data = L.geoJson(schools_data, {
  pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions);
  },
  onEachFeature: function(features, featureLayer) {
    featureLayer.bindPopup(features.properties.Name);
    featureLayer.on('click', function(e) {
      map.setView(e.latlng, 8)
    });

  }
}).addTo(map);
schools_data.eachLayer(function (layer) {
  layer.bindPopup('<strong>District:</strong> ' + layer.feature.properties.DName2019 + '<br>' + '<strong>SubCounty:</strong> ' + layer.feature.properties.Sub_county + '<br>' + '<strong>Name:</strong> ' + layer.feature.properties.school_name + '<br>' + '<strong>Level:</strong> ' + layer.feature.properties.LEVEL + '<br>' + '<strong>Type:</strong> ' + layer.feature.properties.type + '<br>' + '<strong>Sex:</strong> ' + layer.feature.properties.SEX);
  layer.on('mouseover', function (e) {
             this.openPopup();
         });
         layer.on('mouseout', function (e) {
             this.closePopup();
         });
});


	/**
	   * Triggers the load of the spreadsheet and map creation
	   */
    var mapData;

    $.ajax({
      url: 'csv/Options.csv',
      type: 'HEAD',
      error: function () {
        // Options.csv does not exist, so use Tabletop to fetch data from
        // the Google sheet
        mapData = Tabletop.init({
          key: googleDocURL,
          callback: function (data, mapData) { onMapDataLoad(); }
        });
      },
      success: function () {
        // Get all data from .csv files
        mapData = Procsv;
        mapData.load({
          self: mapData,
          tabs: ['Options', 'Points', 'Polygons', 'Polylines'],
          callback: onMapDataLoad
        });
      }
    });
  

// //adding the map
// var map = L.map('map', {
//   minZoom: 8
// }).setView([-0.2, 29.24], 8);


// function setParent(el, newParent) {
//   newParent.appendChild(el);
// }

// var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
//   attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
//   subdomains: 'abcd',
// }).addTo(map);


// // add files from map folder to map1.html
// ["povertyLandCMap", "mapPanes", "styleMap"].forEach(folder => {
//   let hmap = document.createElement("script");
//   hmap.setAttribute("type", "text/javascript");
//   hmap.setAttribute("src", `js/map/${folder}.js`);
//   document.body.appendChild(hmap)
// })

// // layer control
// var povlegend = L.control({
//   position: 'bottomright'
// });
// povlegend.onAdd = function(map) {

//   var div = L.DomUtil.create('div', 'info legend'),
//     povGrades = [0.11, 0.15, 0.18, 0.22, 0.8],
//     povLabels = ['<strong>1 = Max Level of Poverty </strong> <br>'],
//     from, to;

//   for (var i = 0; i < povGrades.length; i++) {
//     from = povGrades[i];
//     to = povGrades[i + 1];

//     povLabels.push(
//       '<i style="background:' + getColorpoverty(from) + '"></i> ' +
//       from + (to ? '&ndash;' + to : '+'));

//   }

//   div.innerHTML = povLabels.join('<br>');
//   return div;
// };

// var denlegend = L.control({
//   position: 'bottomright'
// });

// //layer control 2
// var landlegend = L.control({
//   position: 'bottomright'
// });


// denlegend.onAdd = function(map) {
//   var div = L.DomUtil.create('div', 'info legend'),
//     grades = [100, 200, 400, 9700],
//     labels = ['<strong> People/Sqkm </strong><br>'],
//     from, to;

//   for (var i = 0; i < grades.length; i++) {
//     from = grades[i];
//     to = grades[i + 1];

//     labels.push(
//       '<i style="background:' + getColordensity(from) + '"></i> ' +
//       from + (to ? '&ndash;' + to : '+'));;
//   }

//   div.innerHTML = labels.join('<br>');
//   return div;
// };

// landlegend.onAdd = function(map) {
//   var div = L.DomUtil.create('div', 'info legend');
//   div.innerHTML +=
//     '<img class= "landlegend" src="images/geoserver-GetLegendGraphic.png" alt="legend">';
//   return div;
// };

// //Removing legend from the layer and adding the right one after the click event

// map.on('baselayerchange', function(eventLayer) {

//   function remover(legend) {
//     if(legend._map) {
//       map.removeControl(legend);
//     }
//   }

//   remover(povlegend);
//   remover(denlegend);
//   remover(landlegend);

//   if (eventLayer.name === 'Household Poverty Rates') {
//     povlegend.addTo(map);

//   } else if (eventLayer.name === 'Population Density') {
//     denlegend.addTo(map);
//   }
//   else if (eventLayer.name === 'LandCover Classification') {
//     landlegend.addTo(map);
//   }
// })

// //leaflet legend containers
// var legendFrom = $('.leaflet-top.leaflet-right');
// var legendTo = $('#container1');
// setParent(legendFrom[0], legendTo[0]);

// function layer() {
//   var layer = this;
//   var name = layer.getGeoJSON().name;
//   var item = filters.appendChild(document.createElement('div'));
//   var checkbox = item.appendChild(document.createElement('input'));
//   var label = item.appendChild(document.createElement('label'));
//   checkbox.type = 'checkbox';
//   checkbox.id = name;
//   label.innerHTML = name;
//   label.setAttribute('for', name);
//   checkbox.addEventListener('change', update);

//   function update() {
//     (checkbox.checked) ? layer.addTo(map): map.removeLayer(layer);
//   }
// }
