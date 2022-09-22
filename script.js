let pokeLexikon = [];
let currentPokemon;
let loadLimit = 31;
let offset = 1;
let pokedex = document.getElementById('pokedexContainer');

async function loadPokemons() {
   for (let i = offset; i < loadLimit; i++){ 
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    pokeLexikon.push(currentPokemon);
    renderPokemonCards(i);
}
}

async function renderPokemonCards(i){
    pokedex.innerHTML += /*html*/`<div>${pokeLexikon}[${i}]</div>`
}
