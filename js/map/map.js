var map = L.map('map', {
  minZoom: 7.2
}).setView([0.5479, 33.2026], 11);


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

function getColor(LEVEL) {
  switch (LEVEL) {
    case 'Day Care Centre and Nursery':
      return 'orange';
    case 'Primary only':
      return 'green';
    case 'Nursery only':
      return 'blue';
    case 'Pre-Primary and Primary':
      return '#962727';
    case 'Day Care Centre only':
      return 'yellow';
    default:
      return 'white';
  }
}

var school_data = L.geoJson(school_data, {
  pointToLayer: function(feature, latlng) {
    return new L.CircleMarker(latlng, {
      radius: 5,
      fillOpacity: 1,
      color: 'black',
      fillColor: getColor(feature.properties.LEVEL),
      weight: 0.6,
    });
  }
  // onEachFeature: function(features, featureLayer) {
  //   featureLayer.bindPopup(features.properties.Name);
  //   featureLayer.on('click', function(e) {
  //     map.setView(e.latlng, 8)
  //   });
  //
  // }
}).addTo(map);
school_data.eachLayer(function(layer) {
  layer.bindPopup('<strong>District:</strong> ' + layer.feature.properties.DName2019 + '<br>' + '<strong>SubCounty:</strong> ' + layer.feature.properties.Sub_county + '<br>' + '<strong>Name:</strong> ' + layer.feature.properties.school_name + '<br>' + '<strong>Level:</strong> ' + layer.feature.properties.LEVEL + '<br>' + '<strong>Type:</strong> ' + layer.feature.properties.schools_Type + '<br>' + '<strong>Sex:</strong> ' + layer.feature.properties.schools_Sex);
  layer.on('mouseover', function(e) {
    this.openPopup();
  });
  layer.on('mouseout', function(e) {
    this.closePopup();
  });
});

// district
map.createPane('districtPane');
map.getPane('districtPane').style.zIndex = 200;
var jinja_subcounties = new L.GeoJSON(jinja_subcounties, {
  pane: 'districtPane',
  style: {
    weight: 2,
    opacity: 2,
    color: '#4a4949',
    fillOpacity: 2.5,
    fillColor: '#ffffff00'
  },
  onEachFeature: function(feature, layer) {
    layer.on('mouseover', function() {
      this.setStyle({
        weight: 2,
        opacity: 2,
        color: '#000000',
        fillOpacity: 10,
        fillColor: '#989898'
      });
    });
    layer.on('mouseout', function() {
      this.setStyle({
        weight: 2,
        opacity: 2,
        color: '#4a4949',
        fillOpacity: 2.5,
        fillColor: '#ffffff00'
      });
    });
  }
}).addTo(map);
jinja_subcounties.eachLayer(function(layer) {
  layer.bindPopup('<strong>SubCounty:</strong> ' + layer.feature.properties.Subcounty);
  layer.on('mouseover', function(e) {
    this.openPopup();
  });
  layer.on('mouseout', function(e) {
    this.closePopup();
  });
});
