import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const param = new URLSearchParams(search);
  const city = param.get("city");
  // let id = params.get("city");
  // console.log(city)
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const res = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let target = document.getElementById("data");

  adventures.forEach((element) => {
    let link = document.createElement("a");
    link.href = `detail/?adventure=${element.id}`;
    link.id = element.id;
    link.classList.add("col-sm-6");
    link.classList.add("col-lg-3");
    link.classList.add("mb-4");
    link.innerHTML = `
    <div class = "activity-card ">
    <div class = "activity-card img">
      <img src = "${element.image}"
    </div>
    <div class = "category-banner">
        ${element.category}
    </div>
   
    <div id = "adventure-name">
        <div>${element.name}</div>
        <div>${element.costPerHead}</div>
    </div>
    <div id = "adventure-duration">
        <span>duration</span>
        <span>${element.duration}hr</span>
    </div>
   </div>
    `;
    target.appendChild(link);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredDuration = list.filter((time) => {
    if (time.duration >= low && time.duration <= high) {
      return time;
    }
  });
  console.log(filteredDuration);
  return filteredDuration;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredArr = [];
  console.log(list);
  for (let i = 0; i < categoryList.length; i++) {
    const category = categoryList[i];
    let filteredList = list.filter((adv) => {
      return adv.category === category;
    });
    for (let i = 0; i < filteredList.length; i++) {
      const element = filteredList[i];
      filteredArr.push(element);
    }
  }
  return filteredArr;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let newArr = [];
  if (filters.duration.length > 0) {
    let split = filters.duration.split("-");
    newArr = filterByDuration(list, parseInt(split[0]), parseInt(split[1]));
  } else if (filters.category.length > 0) {
    newArr = filterByCategory(list, filters.category);
  } else if (filters.category.length > 0 && filters.duration.length > 0) {
    let split = filters.duration.split("-");
    newArr = filterByDuration(list, parseInt(split[0]), parseInt(split[1]));
    newArr = filterByCategory(newArr, filters.category);
  } else {
    newArr = list;
  }
  // Place holder for functionality to work in the Stubs
  console.log(newArr);
  return newArr;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));
  return JSON.parse(window.localStorage.getItem("filters"));
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  // Place holder for functionality to work in the Stubs
  return JSON.parse(window.localStorage.getItem("filters"));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList = filters["category"];
  let li = [];
  for (let i = 0; i < categoryList.length; i++) {
    // console.log(categoryList[i]);
    li.push(categoryList[i]);
  }
  console.log(li);
  for (let i = 0; i < li.length; i++) {
    console.log(li[i]);
    var div = document.createElement("div");
    div.setAttribute("class", "category-filter");
    div.innerText = li[i];
    document.getElementById("category-list").append(div);
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
