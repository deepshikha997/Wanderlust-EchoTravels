const mapContainer = document.getElementById("map");

if (!mapContainer) {
  throw new Error("Map container not found.");
}

if (!window.mapboxgl || !mapToken) {
  mapContainer.innerHTML = "<p>Map is unavailable. Check MAP_TOKEN configuration.</p>";
} else if (!Array.isArray(coordinates) || coordinates.length !== 2) {
  mapContainer.innerHTML = "<p>Map coordinates are missing for this listing.</p>";
} else {
  mapboxgl.accessToken = mapToken;

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: coordinates,
    zoom: 9,
  });

  map.on("error", () => {
    mapContainer.innerHTML = "<p>Map failed to load. Verify your Mapbox token and style access.</p>";
  });

  new mapboxgl.Marker({ color: "red" })
    .setLngLat(coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25, closeOnMove: true, className: "map-popup" }).setHTML(
        "<h4>Listing location</h4><p>Exact location will be provided after booking</p>"
      )
    )
    .addTo(map);
}


