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

// -----------
// MARK: Icons
// -----------

var CornerStoreIcon = L.icon({
    iconUrl: '/icons/corner_store.png',
    shadowUrl: '/icons/shadow.png',

    iconSize:     [22, 22], // size of the icon
    shadowSize:   [22, 22], // size of the shadow
    iconAnchor:   [11, 33], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 33],  // the same for the shadow
    popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
});

var OrchardIcon = L.icon({
    iconUrl: '/icons/orchard.png',
    shadowUrl: '/icons/shadow.png',

    iconSize:     [22, 22], // size of the icon
    shadowSize:   [22, 22], // size of the shadow
    iconAnchor:   [11, 33], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 33],  // the same for the shadow
    popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
});

var FarmIcon = L.icon({
    iconUrl: '/icons/barn.png',
    shadowUrl: '/icons/shadow.png',

    iconSize:     [22, 22], // size of the icon
    shadowSize:   [22, 22], // size of the shadow
    iconAnchor:   [11, 33], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 33],  // the same for the shadow
    popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
});

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
    L.marker(cornerStore.coordinates, {icon: CornerStoreIcon}).addTo(map)
      .bindPopup('<b>name:</b> ' + cornerStore.store + '<br><b>address:</b> ' + cornerStore.address);
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
    L.marker(urbanFarm.coordinates, {icon: FarmIcon}).addTo(map)
      .bindPopup('<b>name:</b> ' + urbanFarm.store + '<br><b>address:</b> ' + urbanFarm.address);
  }

});

// ----------------------------
// MARK: Urban Orchard Mappping
// ----------------------------

// async HTTP get request.
d3.csv("/datasets/csv/Urban_Orchards.csv", function(d) {
  var stringCoordinates = d.Notes.split(',');
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
    L.marker(urbanOrchard.coordinates, {icon: OrchardIcon}).addTo(map)
      .bindPopup('<b>name:</b> ' + urbanOrchard.name + '<br><b>address:</b> ' + urbanOrchard.address
        + '<br><b>fruits grown: </b>' + urbanOrchard.fruit);
  }

});

// --------------------------------
// MARK: Active Food Establishments
// --------------------------------

// async HTTP get request.
d3.csv("/datasets/csv/Active_Food_Establishment_Map.csv", function(d) {
  var stringCoordinates = d.Location.split(',');
  stringCoordinates[0] = parseFloat(stringCoordinates[0].substr(1));
  stringCoordinates[1] = parseFloat(stringCoordinates[1].substr(0, stringCoordinates[1].length - 1));
  return {
    name: d.BusinessName,
    address: '',
    neighborhood: '',
    state: 'MA',
    zip: '',
    coordinates: stringCoordinates,
    licenseStatus: d.LICSTATUS
  };
}, function(error, rows) {
  if (error) {
    console.log(error);
    return;
  }

  for (var i = 0; i < rows.length; i++) {
    foodPlace = rows[i];
    L.circle(foodPlace.coordinates, 10, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    })
    .addTo(map)
    .bindPopup('<b>name: </b>' + foodPlace.name + '<br> <b>license status:</b> ' + foodPlace.licenseStatus);
  }

});
