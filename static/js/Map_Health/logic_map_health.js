// working with addMap() function outside of container
var $div = d3
  .select("body")
  .append("div")
  .attr("id", "map")

// Teal lightest to darkest for diabetesData
// function getColor(d) {
//   return d > 15 ? '#004d40':
//   d > 14 ? '#00695c':
//   d > 13 ? '#00796b':
//   d > 12 ? '#00897b':
//   d > 11 ? '#009688':
//   d > 10 ? '#26a69a':
//   d > 9 ? '#4db6ac':
//   d > 8 ? '#80cbc4':
//   d > 7 ? '#b2dfdb':
//             '#e0f2f1';
// }
 
// Color Grade for inactivityData (darkest = most active states : lowest inactivity)
function getColor(d) {
  return d > 40 ? '#b2dfdb':
        d > 35 ? '#80cbc4':
        d > 30 ? '#26a69a':
        d > 25 ? '#00897b':
          d > 20 ? '#00695c':
                      '#004d40';
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

  // diabetesData info
  // info.update = function (props) {
  //     this._div.innerHTML = '<h4>Adult Diabetes</h4>' +  (props ?
  //         '<b>' + props.name + '</b><br />' + props.density + '% pop w/ diabetes'
  //         : 'Hover over a state');
  // };

  // inactivityData info
  info.update = function (props) {
    this._div.innerHTML = '<h4>Inactive Adults</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.density + '% inactive pop'
        : 'Hover over a state');
  };

  info.addTo(map);

  var legend = L.control({position: 'bottomright'});

  // legend.onAdd = function (map) {

  //   var div = L.DomUtil.create('div', 'info legend'),
  //       grades = [7, 8, 9, 10, 11, 12, 13, 14, 15],
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

  geojson = L.geoJson(inactivityData, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);

};

addMap()

