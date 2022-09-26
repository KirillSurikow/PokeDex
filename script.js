let pokeLexikon = [];
let currentPokemon;
let loadLimit = 31;
let offset = 1;
let isLoading = false;


async function loadPokemons() {                            /*Pokemons werden mit fetch runtergeladen*/ 
    for (let i = offset; i < loadLimit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();        /*In JSON Format gepackt*/ 
        pokeLexikon.push(currentPokemon);                        /*In ein Array gepusht*/ 
        renderPokemonCards(i);
    }
    if (isLoading == false) {
        window.addEventListener('scroll', loadMorePokemons);         /*If Abfrage soll Zu schnelles Scrollen soll Dopplungseffekt beim rendern verhindern*/ 
    }
}

async function renderPokemonCards(i) {                /*Einfaches rendern*/ 
    let pokedex = document.getElementById('pokedex');
    let pokemonName = pokeLexikon[i - 1]['name'];
    let pokemonImg = pokeLexikon[i - 1]['sprites']['other']['official-artwork']['front_default'];
    pokedex.innerHTML += returnPokemonCardHTML(i, pokemonName, pokemonImg);
    loadPokemonType(i);
}

function searchPokemon() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();                            /*Such Value wird in Kleinbuchstaben dargestellt*/ 
    let pokedex = document.getElementById('pokedex');
    pokedex.innerHTML = '';
    for (let i = 0; i < pokeLexikon.length; i++) {
        let pokemonName = pokeLexikon[i]['name'];
        if (pokemonName.toLowerCase().includes(search)) {      /*rendere etwas nur dann, wenn sich der Suchwert mir einem Wert aus dem Array deckt*/ 
            renderPokemonCards(i + 1);            /*+1 weil wir den Offset beim Download nicht auf 0 sondern auf 1 gesetzt haben*/ 
        }
    }
}

function deleteSearch() {                         /*Suche soll zurückgesetzt werden*/ 
    let search = document.getElementById('search');
    let pokedex = document.getElementById('pokedex');
    search.value = "";
    pokedex.innerHTML = "";
    refillPokedex();                          /*und auf die ursprüngliche Ansicht gerendert werden*/ 
}

function refillPokedex() {
    for (let i = 1; i <= pokeLexikon.length; i++) {
        renderPokemonCards(i);
    }
}

function loadPokemonType(i) {           /*Man greift auf ein Array im Array zu*/ 
    let characteristicsOfPokemon = pokeLexikon[i - 1]['types']
    for (j = 0; j < characteristicsOfPokemon.length; j++) {
        let type = characteristicsOfPokemon[j]['type']['name'];
        renderTypes(i, type);           /*welches anschließend für jedes Pokemon gerendert werden soll*/ 
    }
}

function renderTypes(i, type) {
    let typeContainer = document.getElementById(`pokemonTypeContainer${i}`);
    typeContainer.innerHTML += /*html*/`<div class="typeCard ${type}">${type}</div>`;
}

let loadMorePokemons = async () => {                         /*man lädt beim Scrollen weitere Pokemons runter*/ 
    if (window.scrollY + window.innerHeight >= document.body.clientHeight - 100 && !isLoading) {    /*wenn die gescrollten pixel zusammen mit einer Bildschirmhöhe die Höhe des Bodys übertreffen und die Boolische Variable false ist*/ 
        isLoading = true;                                                     /*setze den Boolischen Wert für die Dauer der Ladezeit auf true*/ 
        for (let i = loadLimit; i < loadLimit + 30; i++) {             /*setze für die Schleife das Offset auf das vorherige Ladelimit und Erhöhe das Ladelimit um den Betrag des vorherigen Ladelimits*/ 
            let url = `https://pokeapi.co/api/v2/pokemon/${i}`;       
            let response = await fetch(url);
            let currentPokemon = await response.json();
            pokeLexikon.push(currentPokemon);
            renderPokemonCards(i);
            
        }
        loadLimit += 30; 
        offset += 30;
        isLoading = false;            /*den Boolischen Wert wieder auf false setzen, um doppeltes rendern zu verhindern*/ 
    }
}

function showDetails(i) {         /*Detailansicht eines Pokemons*/ 
    showDetailInterface(i);
    hideAndDisable();
    showDetailInterfaceNav(i);
    loadPokemonSingle(i);
    loadPokemonTypeSingle(i)
    loadPokemonDetailsSingle(i);
    preventScrolling();
    checkPositionInArray(i);
}

function showDetailInterface() {        /*Maske wird eingeblendet*/ 
    document.getElementById('detailInterface').classList.remove('d-none');
}

function hideAndDisable() {       /*Hintergrund wird ausgeblurrt und deaktiviert*/ 
    document.getElementById('pokedex').classList.add('hideAndDisable');
    document.getElementById('header').classList.add('hideAndDisable');
}

function showDetailInterfaceNav(i) {   /*Navigationszeile wird eingeblendet*/ 
    let detailInterface = document.getElementById('detailInterface');
    detailInterface.innerHTML = returnDetailInterfaceNavHTML(i)
}

function loadPokemonSingle(i) { /*Die Daten des Pokemons werden Variablen zugeordnet*/ 
    let pokemonName = pokeLexikon[i - 1]['name'];
    let pokemonImg = pokeLexikon[i - 1]['sprites']['other']['official-artwork']['front_default'];
    let pokemonWeight = pokeLexikon[i - 1]['height'];
    let pokemontHeight = pokeLexikon[i - 1]['weight'];
    showPokemonSingle(i, pokemonName, pokemonImg, pokemonWeight, pokemontHeight);
}

function loadPokemonTypeSingle(i) {     /*Die Werte aus dem Array im Array werden ebenfalls mithilfe einer Vorschleife nacheinander einer Variablen zugeordent */ 
    let characteristicsOfPokemon = pokeLexikon[i - 1]['types']
    for (j = 0; j < characteristicsOfPokemon.length; j++) {
        let type = characteristicsOfPokemon[j]['type']['name'];
        showTypesSingle(type);        /* und an die entsprechende Stelle mit der Id i zugeordnet*/ 
    }
}

function loadPokemonDetailsSingle(i) {   /*Dasselbe passiert hier auch*/ 
    let pokemonStats = pokeLexikon[i - 1]['stats'];
    for (j = 0; j < pokemonStats.length; j++) {
        let statName = pokemonStats[j]['stat']['name'];
        let statNumber = pokemonStats[j]['base_stat'];
        showPokemonDetailsSingle(i, statName, statNumber);
    }
}

function preventScrolling() {   /*Wenn die Detailansicht eingeblendet ist soll der Hintergrund temporär nicht scrollbar sein*/ 
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

function generateTheme(i) {  /*Jeder Pokemontyp hat sein eigenes Theme. Welches in der gleichnamigen Klasse hinterlegt ist*/ 
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

function clearTypesContainer() {  /*der typeCardContainer muss bei Aufruf eines anderen Pokemon geleert werden*/ 
    let typesContainer = document.getElementById(`typeCardContainer`);
    typesContainer.innerHTML = '';
}

function clearStats() {
    let stats = document.getElementById('pokemonStats');
    stats.innerHTML = '';
}

function checkPositionInArray(i) {  /*Erstes und Letztes Pokemon haben unterschiedliche NavBars*/ 
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



