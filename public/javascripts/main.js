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

// -----------------------------------
// MARK: Healthy Corner Store Mappping
// -----------------------------------

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

// -------------------------
// MARK: Urban Farm Mappping
// -------------------------

// async HTTP get request.
d3.csv("/datasets/csv/Urban_Farms.csv", function(d) {
  var stringCoordinates = d.Coordinates.split(',');
  stringCoordinates[0] = parseFloat(stringCoordinates[0]);
  stringCoordinates[1] = parseFloat(stringCoordinates[1]);
  return {
    name: d.Name,
    address: d.Location,
    neighborhood: d.Area,
    state: 'MA',
    zip: d.Zip_code,
    coordinates: stringCoordinates
  };
}, function(error, rows) {
  if (error) {
    console.log(error);
    return;
  }

  for (var i = 0; i < rows.length; i++) {
    urbanFarm = rows[i];
    console.log(urbanFarm);
    L.marker(urbanFarm.coordinates).addTo(map)
      .bindPopup('<b>URBAN FARM</b><br>' + urbanFarm.name);
  }

});

// ----------------------------
// MARK: Urban Orchard Mappping
// ----------------------------

// async HTTP get request.
d3.csv("/datasets/csv/Urban_Orchards.csv", function(d) {
  var stringCoordinates = d.Notes.split(',');
  console.log(stringCoordinates);
  stringCoordinates[0] = parseFloat(stringCoordinates[0]);
  stringCoordinates[1] = parseFloat(stringCoordinates[1]);
  return {
    name: d.Name,
    address: d.Location,
    neighborhood: d.Area,
    state: 'MA',
    zip: d.ZIP,
    fruit: d.Fruit || '',
    coordinates: stringCoordinates
  };
}, function(error, rows) {
  if (error) {
    console.log(error);
    return;
  }

  for (var i = 0; i < rows.length; i++) {
    urbanOrchard = rows[i];
    console.log(urbanOrchard);
    L.marker(urbanOrchard.coordinates).addTo(map)
      .bindPopup('<b>URBAN ORCHARD</b><br>' + urbanOrchard.name + '<br>' + urbanOrchard.fruit);
  }

});

// ------------------------------------
// MARK: Summer Farmers Markets Mapping
// ------------------------------------

// async HTTP get request.
d3.csv("/datasets/csv/Urban_Orchards.csv", function(d) {
  var stringCoordinates = d.Notes.split(',');
  console.log(stringCoordinates);
  stringCoordinates[0] = parseFloat(stringCoordinates[0]);
  stringCoordinates[1] = parseFloat(stringCoordinates[1]);
  return {
    name: d.Name,
    address: d.Location,
    neighborhood: d.Area,
    state: 'MA',
    zip: d.ZIP,
    fruit: d.Fruit || '',
    coordinates: stringCoordinates
  };
}, function(error, rows) {
  if (error) {
    console.log(error);
    return;
  }

  for (var i = 0; i < rows.length; i++) {
    urbanOrchard = rows[i];
    console.log(urbanOrchard);
    L.marker(urbanOrchard.coordinates).addTo(map)
      .bindPopup('<b>URBAN ORCHARD</b><br>' + urbanOrchard.name + '<br>' + urbanOrchard.fruit);
  }

});
