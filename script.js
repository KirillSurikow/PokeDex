let pokeLexikon = [];
let currentPokemon;
let loadLimit = 31;
let offset = 1;
let isLoading = false;


async function loadPokemons() {
    for (let i = offset; i < loadLimit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        pokeLexikon.push(currentPokemon);
        renderPokemonCards(i);
    }
    if (isLoading == false) {
        window.addEventListener('scroll', loadMorePokemons);
    }
}

async function renderPokemonCards(i) {
    let pokedex = document.getElementById('pokedex');
    let pokemonName = pokeLexikon[i - 1]['name'];
    let pokemonImg = pokeLexikon[i - 1]['sprites']['other']['official-artwork']['front_default'];
    pokedex.innerHTML += returnPokemonCardHTML(i, pokemonName, pokemonImg);
    loadPokemonType(i);
}

function searchPokemon() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    let pokedex = document.getElementById('pokedex');
    pokedex.innerHTML = '';
    for (let i = 0; i < pokeLexikon.length; i++) {
        let pokemonName = pokeLexikon[i]['name'];
        if (pokemonName.toLowerCase().includes(search)) {
            renderPokemonCards(i + 1);
        }
    }
}

function deleteSearch() {
    let search = document.getElementById('search');
    let pokedex = document.getElementById('pokedex');
    search.value = "";
    pokedex.innerHTML = "";
    refillPokedex();
}

function refillPokedex() {
    for (let i = 1; i <= pokeLexikon.length; i++) {
        renderPokemonCards(i);
    }
}

function loadPokemonType(i) {
    let characteristicsOfPokemon = pokeLexikon[i - 1]['types']
    for (j = 0; j < characteristicsOfPokemon.length; j++) {
        let type = characteristicsOfPokemon[j]['type']['name'];
        renderTypes(i, type);
    }
}

function renderTypes(i, type) {
    let typeContainer = document.getElementById(`pokemonTypeContainer${i}`);
    typeContainer.innerHTML += /*html*/`<div class="typeCard ${type}">${type}</div>`;
}

let loadMorePokemons = async () => {
    if (window.scrollY + window.innerHeight >= document.body.clientHeight) {
        isLoading = true;
        for (let i = loadLimit; i < loadLimit + 31; i++) {
            let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            let response = await fetch(url);
            let currentPokemon = await response.json();
            pokeLexikon.push(currentPokemon);
            renderPokemonCards(i);
            isLoading = false;
        }
        loadLimit += 30;
        offset += 30;
    }
}

function showDetails(i) {
    showDetailInterface(i);
    hideAndDisable();
    showDetailInterfaceNav(i);
    loadPokemonSingle(i);
    loadPokemonTypeSingle(i)
    loadPokemonDetailsSingle(i);
    preventScrolling();
    checkPositionInArray(i);
}

function showDetailInterface() {
    document.getElementById('detailInterface').classList.remove('d-none');
}

function hideAndDisable() {
    document.getElementById('pokedex').classList.add('hideAndDisable');
    document.getElementById('header').classList.add('hideAndDisable');
}

function showDetailInterfaceNav(i) {
    let detailInterface = document.getElementById('detailInterface');
    detailInterface.innerHTML = returnDetailInterfaceNavHTML(i)
}

function loadPokemonSingle(i) {
    let pokemonName = pokeLexikon[i - 1]['name'];
    let pokemonImg = pokeLexikon[i - 1]['sprites']['other']['official-artwork']['front_default'];
    let pokemonWeight = pokeLexikon[i - 1]['height'];
    let pokemontHeight = pokeLexikon[i - 1]['weight'];
    showPokemonSingle(i, pokemonName, pokemonImg, pokemonWeight, pokemontHeight);
}

function loadPokemonTypeSingle(i) {
    let characteristicsOfPokemon = pokeLexikon[i - 1]['types']
    for (j = 0; j < characteristicsOfPokemon.length; j++) {
        let type = characteristicsOfPokemon[j]['type']['name'];
        showTypesSingle(type);
    }
}

function loadPokemonDetailsSingle(i) {
    let pokemonStats = pokeLexikon[i - 1]['stats'];
    for (j = 0; j < pokemonStats.length; j++) {
        let statName = pokemonStats[j]['stat']['name'];
        let statNumber = pokemonStats[j]['base_stat'];
        showPokemonDetailsSingle(i, statName, statNumber);
    }
}

function preventScrolling() {
    document.body.style.overflow = 'hidden';
}

function showPokemonSingle(i, pokemonName, pokemonImg, pokemonWeight, pokemontHeight) {
    let detailInterface = document.getElementById('detailInterface');
    detailInterface.innerHTML += returnHeadInterfaceHTML(i, pokemonName, pokemonImg, pokemonWeight, pokemontHeight)
}

function showTypesSingle(type) {
    let typeContainer = document.getElementById('typeCardContainer');
    typeContainer.innerHTML += /*html*/`<div class="typeCard interfaceTypeCard ${type}">${type}</div>`
}

function showPokemonDetailsSingle(i, statName, statNumber) {
    let pokemonStats = document.getElementById('pokemonStats');
    let type = generateTheme(i);
    pokemonStats.innerHTML += returnPokemonStatsHTML(statName, statNumber, type);
}

function generateTheme(i) {
    return pokeLexikon[i - 1]['types'][0]['type']['name'];
}

function closeDetailInterface(i) {
    document.getElementById('detailInterface').classList.add('d-none')
    removeHideAndDisable();
    clearTypesContainer();
    clearStats();
    activateScrolling();
}

function activateScrolling() {
    document.body.style.overflow = 'visible';
}

function removeHideAndDisable() {
    document.getElementById('pokedex').classList.remove('hideAndDisable');
    document.getElementById('header').classList.remove('hideAndDisable');
}

function clearTypesContainer() {
    let typesContainer = document.getElementById(`typeCardContainer`);
    typesContainer.innerHTML = '';
}

function clearStats() {
    let stats = document.getElementById('pokemonStats');
    stats.innerHTML = '';
}

function checkPositionInArray(i) {
    if (i == 1) {
        document.getElementById('previousBtn').classList.add('d-none')
    }
    if (i == pokeLexikon.length) {
        document.getElementById('nextBtn').classList.add('d-none')
    }
}

function nextPokemon(i) {
    i++;
    showDetails(i);
}

function previousPokemon(i) {
    i--;
    showDetails(i);
}



