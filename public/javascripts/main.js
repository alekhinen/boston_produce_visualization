var map = L.map('map').setView([42.3601, -71.0589], 13);

// TODO: Use MapBox
// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//   attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//   maxZoom: 18,
//   id: 'your.mapbox.project.id',
//   accessToken: 'your.mapbox.public.access.token'
// }).addTo(map);

var tiles = L.tileLayer('http://{s}.tile.stamen.com/terrain-lines/{z}/{x}/{y}.{ext}', {
  attribution: "Map tiles by <a href='http://stamen.com'>Stamen Design</a>, <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a> &mdash; Map data &copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

// async HTTP get request.
d3.csv("/datasets/csv/Healthy_Corner_Stores.csv", function(d) {
  var stringCoordinates = d.Coordinates.split(',');
  stringCoordinates[0] = parseFloat(stringCoordinates[0]);
  stringCoordinates[1] = parseFloat(stringCoordinates[1]);
  return {
    store: d.Store,
    address: d.Address,
    neighborhood: d.Area,
    state: d.State,
    coordinates: stringCoordinates
  };
}, function(error, rows) {
  if (error) {
    console.log(error);
    return;
  }

  for (var i = 0; i < rows.length; i++) {
    cornerStore = rows[i];
    console.log(cornerStore);
    L.marker(cornerStore.coordinates).addTo(map)
      .bindPopup('<b>HEALTHY CORNER STORE</b><br>' + cornerStore.store);
  }

});
