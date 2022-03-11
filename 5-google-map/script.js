const mapbox_ACCESS_TOKEN =
  "pk.eyJ1IjoiYWxpLXAiLCJhIjoiY2t6d3Ayd2VsMmxzeTJ3cGUzOGZ3dXhicSJ9.aoGDTxjhSuiW3ttZGRDOFg";

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});

function setupMap(centerPosition) {
  const map = new mapboxgl.Map({
    accessToken: mapbox_ACCESS_TOKEN,
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: centerPosition, // starting position [lng, lat]
    zoom: 9, // starting zoom
  });
  const NavigationControls = new mapboxgl.NavigationControl();
  map.addControl(NavigationControls);
  const directionControls = new MapboxDirections({
    accessToken: mapbox_ACCESS_TOKEN,
  });
  map.addControl(directionControls, "top-left");
}

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
  setupMap([-2.24, 53.48]);
  console.log("oo not");
}
