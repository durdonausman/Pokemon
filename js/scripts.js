let genreArray = [];

// Custom functions
let findElement = (selectorName) => document.querySelector(selectorName);
let makeElement = (tagName) => document.createElement(tagName);

// Elements
let searchForm = findElement(".pokemon__form");

let pokemonList = findElement(".pokemon__list");
let genresSelect = findElement(".pokemon__form-genre");
let searchInput = findElement(".pokemon__form-input");
let sortSelect = findElement(".pokemon__form-sort");

// Pokemon Template
let pokemonTemplate = findElement("#pokemon-template").content;

// Aa-Zz sort function
let sortAz = function (a, b) {
  if (a.name > b.name) {
    return 1;
  }

  if (b.name > a.name) {
    return -1;
  }

  return 0;
};

// Zz-Aa sort function
let sortZa = function (a, b) {
  if (a.name > b.name) {
    return -1;
  }

  if (b.name > a.name) {
    return 1;
  }

  return 0;
};

// New-Old sort function
let sortNewOld = function (a, b) {
  return b.birth_date - a.birth_date;
};

// Old-New sort function
let sortOldNew = function (a, b) {
  return a.birth_date - b.birth_date;
};

// Sorts Object Functions
let sortFunctions = {
  0: sortAz,
  1: sortZa,
  2: sortNewOld,
  3: sortOldNew,
};

// Get Pokemon Type Function
function getPokemonType(type) {
  if (!genreArray.includes(type)) {
    genreArray.push(type);

    let typeOption = makeElement("option");
    typeOption.textContent = type;
    typeOption.value = type;

    genresSelect.appendChild(typeOption);
  }
}

// Get Year Function
function date(data) {
  let year = new Date(data).getFullYear();

  return `${String(year)}`;
}

// Create New Pokemon Element
function createPokemon(pokemon) {
  let elPokemon = pokemonTemplate.cloneNode(true);

  //  elMovie.querySelector(".movie-img").src = movie.poster;
  //  elMovie.querySelector(".movie-img").width = "250";
  //  elMovie.querySelector(".movie-title").textContent = movie.title;

  elPokemon.querySelector(".pokemon-img").src = pokemon.img;
  elPokemon.querySelector(".pokemon-img").width = "157";
  elPokemon.querySelector(".pokemon-img").height = "157";
  elPokemon.querySelector(".pokemon-title").textContent = pokemon.name;
  elPokemon.querySelector(".pokemon-weight").textContent = pokemon.weight;

  pokemon.type.forEach((type) => {
    let newTypeSpan = makeElement("span");

    newTypeSpan.textContent = type;
    elPokemon.querySelector(".pokemon-type").appendChild(newTypeSpan);

    getPokemonType(type);
  });

  elPokemon.querySelector(".pokemon-age").textContent = date(
    pokemon.birth_date
  );

  pokemonList.appendChild(elPokemon);
}

// Search Pokemon Function
function searchPokemon(evt) {
  evt.preventDefault();

  pokemonList.innerHTML = null;

  let typeValue = genresSelect.value;
  let searchValue = searchInput.value.trim();
  let sortValue = sortSelect.value;

  console.log(sortValue);

  let newRegExp = new RegExp(searchValue, "gi");

  let foundPokemon = pokemons
    .filter((pakemon) => {
      if (typeValue === "All") {
        return pakemon;
      }

      return pakemon.type.includes(typeValue);
    })
    .filter((pakemon) => {
      return pakemon.name.match(newRegExp);
    })
    .sort(sortFunctions[sortValue]);

  console.log(sortFunctions[sortValue]);

  foundPokemon.forEach((pakemon) => {
    createPokemon(pakemon);
  });
}

pokemons.forEach((dragon) => {
  createPokemon(dragon);
});

searchForm.addEventListener("submit", searchPokemon);
