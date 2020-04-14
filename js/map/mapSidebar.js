var sidebar = L.control.sidebar('sidebar', {
  position: 'right'
});

map.addControl(sidebar);

setTimeout(function () {
  sidebar.show();
}, 500);


var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
  this.update();
  return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  this._div.innerHTML = '<h4>Information</h4>' + (props ?
    '<b> Clicked School: ' + props.school_name + '</b><br /> <b> Status: ' + props.REGISTRATI + '</b> <br /> EMIS Status: ' + props["EMIS STATU"] + '<br /> EMIS Number: ' + props["EMIS No."] + '<br /> Year Founded: ' + props["YEAR FOUND"] + '<br />' +
    '<h4>School - Information</h4>' +
    '<b> Level: ' + props["schools_Level"] + '</b><br />' +
    '<b> Class: ' + props["schools_Sex"] + '</b><br />' +
    '<b> Type: ' + props["schools_Type"] + '</b><br />' +
    '<b> Coordinates: Lat - ' + props["NORTHINGS"] + ' | Long - ' + props["EASTINGS C"] + '</b><br />'
    : "Click on a school to display it's information");
};

info.addTo(map);


var slider = document.getElementById('slider1');

noUiSlider.create(slider, {
  start: [0, 2500],
  connect: true,
  tooltips: true,
  range: {
    'min': 0,
    'max': 2500
  },
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return value.replace('%', '');
    }
  }
});



slider.noUiSlider.on('slide', addValues);


function addValues() {
  var allValues = [];
  var range, rangeMin, rangeMax;
  var realRange = [];
  allValues.push([slider.noUiSlider.get()]);
  range = slider.noUiSlider.get();
  rangeMin = range.slice(0, 1);
  rangeMax = range.slice(1);

  realRange.push(rangeMin.concat(rangeMax));
  rangeMin = [+(rangeMin)];
  rangeMax = [+(rangeMax)];

  for (key in map['_layers']) {
    if (typeof map['_layers'][key]['feature'] !== 'undefined' && map['_layers'][key]['feature']['geometry']['type'] !== 'MultiPolygon') {
      var l = map['_layers'][key];
      l.setStyle({
        radius: 6,
        fillColor: "#7d7d7d",
        color: "#000",
        weight: 1,
        opacity: 0.4,
        fillOpacity: 0.4
      })
    }
  }

  for (key in map['_layers']) {
    if (typeof map['_layers'][key]['feature'] !== 'undefined' && map['_layers'][key]['feature']['geometry']['type'] !== 'MultiPolygon') {
      var l = map['_layers'][key];
        if (l['feature']['properties']["TOTAL ENRO"] >= parseFloat(allValues[0][0][0]) && l['feature']['properties']["TOTAL ENRO"] <= parseFloat(allValues[0][0][1]) ) {
          l.setStyle({
            radius: 6,
            fillColor: "#c3ff3e",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
          })
        }
    }
  }
}


$('.info.leaflet-control').appendTo('#info')