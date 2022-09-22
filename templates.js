function returnPokemonCardHTML(i, pokemonName, pokemonImg) {
    return /*html*/`
        <div class="pokeCard" onclick="showDetails(${i})">
            <div class="headInfo">
                <div class="idNameContainer">
                    <div class="pokemonID">#${i}</div>
                    <div class="pokemonName">${pokemonName}</div>
                </div>
                <div class="pokemonTypeContainer" id="pokemonTypeContainer${i}"></div>
            </div>
            <div class="pokemonImg"><img src="${pokemonImg}"></div>
        </div>
    `
}