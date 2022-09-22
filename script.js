let pokeLexikon = [];
let currentPokemon;
let loadLimit = 31;
let offset = 1;


async function loadPokemons() {
    for (let i = offset; i < loadLimit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        pokeLexikon.push(currentPokemon);
        renderPokemonCards(i);
    }
    window.addEventListener('scroll', loadMorePokemons);
}

async function renderPokemonCards(i) {
    let pokedex = document.getElementById('pokedex');
    let pokemonName = pokeLexikon[i - 1]['name'];
    let pokemonImg = pokeLexikon[i - 1]['sprites']['other']['official-artwork']['front_default'];
    pokedex.innerHTML += returnPokemonCardHTML(i, pokemonName, pokemonImg);
    loadPokemonType(i);
}

function loadPokemonType(i) {
    let characteristicsOfPokemon = pokeLexikon[i-1]['types']
    for (j = 0; j < characteristicsOfPokemon.length; j++) {
      let type =  characteristicsOfPokemon[j]['type']['name'];
      renderTypes(i, type);
    }
}

function renderTypes(i, type){
    let typeContainer = document.getElementById(`pokemonTypeContainer${i}`);
    typeContainer.innerHTML += /*html*/`<div class="typeCard ${type}">${type}</div>`;
}

let loadMorePokemons = async () => {
    if (window.scrollY + window.innerHeight >= document.body.clientHeight) {
        for (let i = loadLimit; i < loadLimit + 31; i++) {
            let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            let response = await fetch(url);
            let currentPokemon = await response.json();
            pokeLexikon.push(currentPokemon);
            renderPokemonCards(i);
        }
        loadLimit += 30;
        offset += 30;
    }
}
