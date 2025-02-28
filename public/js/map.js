
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: listing.geometry.coordinates,
  zoom: 9,
  });

  const marker = new mapboxgl.Marker({color: "red"})
  .setLngLat(Listing.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({offset: 25,closeOnMove: true,className: 'map-popup'})
    .setHTML(`<h4>${listing.title}</h4><p>Exact Location will be provided after booking</p>`))
  .addTo(map);


