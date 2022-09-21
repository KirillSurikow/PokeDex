let currentPokemon;

async function loadPokemons() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    let currentPokemon = await response.json();

    renderPokemonInfo(currentPokemon);
}

function renderPokemonInfo(currentPokemon) {
    renderPokemonName(currentPokemon);
    renderPokemonImg(currentPokemon);
}

function renderPokemonName(currentPokemon){
    document.getElementById('pokemonName').innerHTML = currentPokemon['name']
}

function renderPokemonImg(currentPokemon){
    document.getElementById('pokemonImg').src = currentPokemon['sprites']['front_shiny'];
}