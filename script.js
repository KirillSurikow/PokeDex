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

function showDetails(i){
   showDetailInterface();
   hideAndDisable();
   showDetailInterfaceNav(i);
   loadPokemonSingle(i);
   loadPokemonTypeSingle(i)
   loadPokemonDetailsSingle(i);
}

function showDetailInterface(){
  document.getElementById('detailInterface').classList.remove('d-none');
}

function hideAndDisable(){
    document.getElementById('pokedex').classList.add('hideAndDisable');
    document.getElementById('header').classList.add('hideAndDisable');
}

function showDetailInterfaceNav(i){
    let detailInterface = document.getElementById('detailInterface');
    detailInterface.innerHTML += /*html*/`
       <div class="detailNav"> 
          <div class="closeDetailIntervace">
             <img class="closeBtn" src="img/close.png" alt="close">
          </div>
          <div class="nextPrev">
             <img class="previousBtn" src="img/previous.png" alt="previous">
             <img class="nextBtn" src="img/next.png" alt="next">
          </div>
       </div>
        `
}

function loadPokemonSingle(i){
    let pokemonName = pokeLexikon[i - 1]['name'];
    let pokemonImg = pokeLexikon[i - 1]['sprites']['other']['official-artwork']['front_default']; 
    let pokemonWeight = pokeLexikon [i - 1]['height'];
    let pokemontHeight = pokeLexikon [i - 1]['weight'];
    showPokemonSingle(i, pokemonName, pokemonImg, pokemonWeight, pokemontHeight);
}

function loadPokemonTypeSingle(i){
    let characteristicsOfPokemon = pokeLexikon[i-1]['types']
    for (j = 0; j < characteristicsOfPokemon.length; j++) {
      let type =  characteristicsOfPokemon[j]['type']['name'];
      showTypesSingle(i, type);
    }
}

function loadPokemonDetailsSingle(i){
    let pokemonStats = pokeLexikon[i-1]['stats'];
    for (j = 0; j < pokemonStats.length; j++){
        let statName = pokemonStats[j]['stat']['name'];
        let statNumber = pokemonStats[j]['base_stat'];
        showPokemonDetailsSingle(i, statName, statNumber)
    }
}

function showPokemonSingle(i, pokemonName, pokemonImg, pokemonWeight, pokemontHeight){
    let detailInterface = document.getElementById('detailInterface');
    detailInterface.innerHTML += /*html*/ `
       <div class="headInterface">
           <div class="headInfo">
                 <div class="nameID">
                     <div class="idInterface">#${i}</div>
                     <div class="nameInterface">${pokemonName}</div>
                 </div>
                 <div class="heightWeight">
                     <div class="measure">Weight: ${pokemonWeight}</div>
                     <div class="measure">Height: ${pokemontHeight}</div>
                 </div>
            </div>
            <div class="imgInterfaceContainer"><img class="imgInterface" src="${pokemonImg}"></div>
        </div>
        `
}


