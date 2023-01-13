import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const param = new URLSearchParams(search);
  const city = param.get("adventure");
  // let id = params.get("city");
  console.log(city);
  return city;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const res = await fetch(
      `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // console.log(adventure)
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  document.getElementById("adventure-content").innerHTML = adventure.content;
  adventure.images.forEach((image) => {
    let parent = document.createElement("div");
    parent.innerHTML = `
      <img class = "activity-card-image" src = "${image}" alt = "" />
    `;
    document.getElementById("photo-gallery").appendChild(parent);
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators" id = "carousel-indicators"></div>
  <div class="carousel-inner" id = "carousel-inner"></div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;
  images.forEach((image, imageIndex) => {
    const carouselItemElem = document.createElement("div");
    carouselItemElem.className = `carousel-item${
      imageIndex === 0 ? " active" : ""
    }`;
    carouselItemElem.innerHTML = `
    <img class = "activity-card-image" src = ${image}
    alt = ""
    srcset = ""
    class = "acrivity-card-image pb-3 pb-md-0 "
    />`;
    document.getElementById("carousel-inner").appendChild(carouselItemElem);

    const indicatorElemStr = `
      <button type = "button" data-bs-target = "#carouselExampleIndicators"
      data-bs-slide-to = "${imageIndex}"
      aria-label = "slide ${imageIndex + 1}"
      ${
        imageIndex === 0 ? `class = "active" aria-current = true ` : ""
      }></button>
    `;
    document.getElementById("carousel-indicators").innerHTML +=
      indicatorElemStr;
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-panel-available").style.display =
      "block";
    document.getElementById("reservation-person-cost").innerHTML =
      adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
    document.getElementById("reservation-panel-available").style.display =
      "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  return (document.getElementById("reservation-cost").innerHTML =
    adventure.costPerHead * persons);
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let data = document.getElementById("myForm");
  // console.log(data.elements["name"].value)
  // console.log(data.elements["date"].value)
  // console.log(data.elements["person"].value)

  data.addEventListener("submit", async function (formData) {
    formData.preventDefault();
    try {
      let options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: data.elements["name"].value,
          date: data.elements["date"].value,
          person: data.elements["person"].value,
          adventure: adventure.id,
        }),
      };
      let res = await fetch(
        `${config.backendEndpoint}/reservations/new`,
        options
      );
      let resData = await res.json();
      alert("Success");
      console.log(resData);
    } catch (error) {
      alert("failed");
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  // let reserved = document.getElementById("reserved-banner")
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block"
  } else {
    document.getElementById("reserved-banner").style.display = "none"
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
