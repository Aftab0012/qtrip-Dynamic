import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  // console.log(config)
  // console.log("from init")
  //Updates the DOM with the cities

  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const res = await fetch(`${config.backendEndpoint}/cities`);
    const data = await res.json();
    // console.log(data)
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let target = document.getElementById("data");
  let links = document.createElement("a");
  links.setAttribute(`id`, `${id}`);
  links.classList.add("col-sm-6");
  links.classList.add("col-lg-3");
  links.classList.add("mb-4");
  // links.href = `pages/adventures/?city=${id}`;
  links.innerHTML = `
  <a href="pages/adventures/?city=${id}" id="${id}">
        <div class="tile text-white">
            <img class="img-fluid imgSize" src="${image}">
            <div class="tile-text text-center pb-3">
                <h5>${city}</h5>
                <div>${description}</div>
            </div>
        </div>
    </a>`;
  target.appendChild(links);
}

export { init, fetchCities, addCityToDOM };
