// let map;

// async function initMap() {
//   const { Map } = await google.maps.importLibrary("maps");
//   map = new Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8,
//   });
// }

// // initMap();

// const DirectionsRequest = {
//   origin: "Chicago, IL",
//   destination: "Los Angeles, CA",
//   travelMode: "DRIVING",
//   //add others when functional
// };

// const directionsService = new google.map.DirectionsService();
// directionsService.route();

// directionsService.route(
//     {
//     origin: 'Chicago, IL',
//     destination: 'Los Angeles, CA',
//     travelMode: 'DRIVING',
// });

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 37.0902, lng: -95.7129 }, // Centered on the USA.
  });
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    map: map,
    panel: document.getElementById("panel"),
  });

  directionsRenderer.addListener("directions_changed", () => {
    const directions = directionsRenderer.getDirections();

    if (directions) {
      computeTotalDistance(directions);
    }
  });

  const startFromInput = document.getElementById("startFromInput");
  const destinationInput = document.getElementById("destinationInput");

  let startHere = document.querySelector("#startFromInput"); //Event Listener
  let endHere = document.querySelector("#destinationInput"); //Event Listener
  let startLoc = "";
  let endLoc = "";

  startHere.addEventListener("input", (e) => {
    startLoc = startHere.value;
    console.log(startLoc);
  });

  endHere.addEventListener("input", (e) => {
    endLoc = endHere.value;
    console.log(endLoc);
  });

  const previewMap = document.getElementById("previewMap");

  previewMap.addEventListener("click", (e) => {
    displayRoute(startLoc, endLoc, directionsService, directionsRenderer);
  });
}

function displayRoute(origin, destination, service, display) {
  service
    .route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((result) => {
      display.setDirections(result);
    })
    .catch((e) => {
      // alert("Could not display directions due to: " + e);
    });
}

function computeTotalDistance(result) {
  let total = 0;
  const myroute = result.routes[0];

  if (!myroute) {
    return;
  }

  for (let i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }

  total = total / 1000;
  document.getElementById("total").innerHTML = total + " km";
}

window.initMap = initMap;
