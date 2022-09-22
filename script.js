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
}

async function renderPokemonCards(i) {
    let pokedex = document.getElementById('pokedex');
    let pokemonName = pokeLexikon[i - 1]['name'];
    let pokemonImg = pokeLexikon[i-1]['sprites']['other']['official-artwork']['front_default'];
    pokedex.innerHTML += /*html*/`
        <div class="pokeCard">
          <div class="pokemonID">#${i}</div>  
          <div class="pokemonName">${pokemonName}</div>
          <div class="pokemonImg"><img src="${pokemonImg}"></div>
        </div>
        `
}

let loadMorePokemons = async () => {
    if (window.scrollY + window.innerHeight >= document.body.clientHeight){
        for (let i = loadLimit; i < loadLimit + 31 ; i++) {
            let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            let response = await fetch(url);
            let currentPokemon = await response.json();
            pokeLexikon.push(currentPokemon);
            renderPokemonCards(i);
        }
        loadLimit +=30;
        offset += 30;
    }
}
