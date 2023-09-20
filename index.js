//https://codepen.io/Amr_Saker/pen/NWKgxLv

let myId;
let x = document.getElementById(myId);

function allowDrop(eve) {
  eve.preventDefault();
}
function DragStart(eve) {
  myId = eve.target.id;
}

function drop(eve) {
  eve.preventDefault();
  eve.target.append(document.getElementById(myId));
  displayMotorcycle();
}
// https://codepen.io/Amr_Saker/pen/NWKgxLv

// function allowDrop(e){
//   e.preventDefault();
// }

// function drag(e){
//   e.dataTransfer.setData("text",e.target.id);
// }

// function drop(e){
//   e.preventDefault();
//   var data= e.dataTransfer.getData("text");
//   e.target.appendChild(document.querySelector("#"+data));
// }

// let input = document.getElementsByName("div");

let motorcycleInfo = [
  { 
  name: "Harley-Davidson",
  imageUrl: "https://www.webbikeworld.com/wp-content/uploads/2023/01/Davidson2-1521x760.jpg",
},
{
  name: "kawasaki",
  imageUrl: "https://i.pinimg.com/originals/fd/2a/e8/fd2ae84cc75a10e272ef66f35c8ed0dc.jpg",
},
{
  name: "suzuki",
  imageUrl: "https://cdn-fastly.motorcycle.com/media/2023/03/30/11414896/suzuki-motorcycles.jpg?size=720x845&nocrop=1",
},
{
  name: "ducati",
  imageUrl: "https://www.oovango.com/wp-content/uploads/2022/01/Ducati-Streetfighter-V4s-750x504.jpg",
}
];

// let motorDiv = document.querySelectorAll(".motorcycle-container");
// button.addEventListener("click", (e) => {
  
//   button.disabled = true; //setting button state to disabled
//   input.addEventListener("change", stateHandle);
  
//   function stateHandle() {
//       if (document.querySelector(".drop-zone").value === "") {
//           button.disabled = true; //button remains disabled $('linkID').observe('click', function(event) { event.stop() });
//       } else {
//           button.disabled = false; //button is enabled
//       }
//   }
// })
const motorcycles = document.querySelector(".cycle-container");

function displayMotorcycle() {
const dropBox = document.querySelector(".drop-container");
  motorcycleInfo.forEach((motorcycle, index) => {
    const tempLI = document.createElement("div");
      tempLI.ClassName = "motorcycle-container d-flex justify-content-evenly";
      tempLI.innerHTML = `
      <a href="index.html"
      ><img
       class="motorcycle"
        src="${motorcycle.imageUrl}"
        alt="${motorcycle.name}"
        height="200px"
        width="200px"
    /></a>`;

    if (index < 2 ){
      motorcycles.insertBefore(tempLI, dropBox) // https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
    } else {
      motorcycles.appendChild(tempLI)
    }

  });
}


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
  let clearAll = document.getElementById("clearAll");
  let inputs = document.querySelectorAll("inputs");

  // clearAll.addEventListener("click", (e)=> {
  //   inputs.forEach(input => input.value = "")
  // });




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

let avoidHighways;
let avoidTolls;
let provideRouteAlternatives;
let travelMode;

function displayRoute(origin, destination, service, display) {
  service
    .route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
      avoidHighways,
      avoidTolls,
      provideRouteAlternatives,
    })
    .then((result) => {
      display.setDirections(result);
    })
    .catch((e) => {
      console.log(e);
    });
}

const fastestSwitch = document.getElementById("fastestSwitch");

fastestSwitch.addEventListener("change", function () {
  if (fastestSwitch.checked) {
    provideRouteAlternatives = true;
  } else {
    provideRouteAlternatives = false;
  }
  console.log(provideRouteAlternatives);
});

const safestSwitch = document.getElementById("safestSwitch");

safestSwitch.addEventListener("change", function () {
  if (safestSwitch.checked) {
    avoidHighways = true;
    avoidTolls = true;
  } else {
    avoidHighways = false;
    avoidTolls = false;
  }
  console.log(avoidHighways);
});

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
