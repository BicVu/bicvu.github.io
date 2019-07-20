// working with addMap() function outside of container
var $div = d3
  .select("body")
  .append("div")
  .attr("id", "map")

// Indigo gradient
function getColor(d) {
    return d > 35 ? '#c62828':
            d > 30 ? '#d32f2f':
            d > 25 ? '#e53935':
            d > 20 ? '#f44336':
            d > 15 ? '#ef5350':
            d > 10 ? '#e57373':
            d > 5 ? '#ef9a9a':
                '#ffcdd2';
}

function addMap() {
var map = L.map("map", {
  center: [37.8, -96],
  zoom: 4
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  // attribution: "Data from CDC",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(map);

// Draw static polygons with chloropleth
function style(feature) {
    return {
    fillColor: getColor(feature.properties.density),
    fillOpacity: 0.7,
    weight: 1, // Stroke weight
    color: 'white', // Stroke color
    opacity: 1, // Stroke opacity
    dashArray: '3' // Dash length
    };
}

// Highlight upon hover
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 4,
        color: '#fff',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
  }

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
  }

  function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
  }

  // Adding controls to map
  var info = L.control();

  info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
  };

  // method that we will use to update the control based on feature properties passed
  info.update = function (props) {
      this._div.innerHTML = '<h5>Vending Machines in Schools</h5>' +  (props ?
          '<b>' + props.name + '</b><br />' + props.density + '% HS allows vending machine'
          : 'Hover over a state');
  };

  info.addTo(map);

  // var legend = L.control({position: 'bottomright'});

  // legend.onAdd = function (map) {

  //   var div = L.DomUtil.create('div', 'info legend'),
  //       grades = [35, 30, 25, 20, 15, 10, 5],
  //       labels = [];

  //   // loop through our density intervals and generate a label with a colored square for each interval

  //   for (var i = 0; i < grades.length; i++) {
  //       div.innerHTML +=
  //           '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
  //           grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  //   }

  //   return div;
  // };

  // legend.addTo(map);


  // Add layer to map
  var geojson;

  geojson = L.geoJson(vendingData, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);

  };

addMap()
