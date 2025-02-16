document.addEventListener("DOMContentLoaded", loadAttractions);

let allAttractions = [];

async function loadAttractions() {
  try {
    const response = await fetch("attractions.json");
    allAttractions = await response.json();
    displayAttractions(allAttractions);
    loadFavorites();
  } catch (error) {
    console.error("Error loading attractions:", error);
  }
}

function displayAttractions(attractions) {
  const list = document.getElementById("attractionsList");
  list.innerHTML = "";

  attractions.forEach((attraction) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
            <img src="${attraction.image}" alt="${attraction.name}">
            <h3>${attraction.name}</h3>
            <p>Type: ${attraction.type}</p>
            <p>Address: ${attraction.address}</p>
            <p>Rating: ⭐ ${attraction.rating}</p>
            <button onclick="saveFavorite(${attraction.id})">Save</button>
        `;
    list.appendChild(div);
  });
}

function searchAttractions() {
  let query = document.getElementById("searchBox").value.toLowerCase();
  const filtered = allAttractions.filter((a) =>
    a.name.toLowerCase().includes(query)
  );
  displayAttractions(filtered);
}

function filterByCategory() {
  let category = document.getElementById("filterCategory").value;
  if (category === "all") {
    displayAttractions(allAttractions);
  } else {
    const filtered = allAttractions.filter((a) => a.type === category);
    displayAttractions(filtered);
  }
}

function resetFilters() {
  document.getElementById("searchBox").value = "";
  document.getElementById("filterCategory").value = "all";
  displayAttractions(allAttractions);
}

function saveFavorite(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavorites();
  }
}

function loadFavorites() {
  const list = document.getElementById("favoritesList");
  list.innerHTML = "";
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const favoriteAttractions = allAttractions.filter((a) =>
    favorites.includes(a.id)
  );

  favoriteAttractions.forEach((attraction) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
            <img src="${attraction.image}" alt="${attraction.name}">
            <h3>${attraction.name}</h3>
            <button onclick="removeFavorite(${attraction.id})">Remove</button>
        `;
    list.appendChild(div);
  });
}

function removeFavorite(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((favId) => favId !== id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  loadFavorites();
}
