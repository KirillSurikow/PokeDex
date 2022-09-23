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
            <div class="pokemonImgContainer"><img class="pokemonImg" src="${pokemonImg}"></div>
            
        </div>
    `
}

function returnHeadInterfaceHTML(i, pokemonName, pokemonImg, pokemonWeight, pokemontHeight){
    return /*html*/ `
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
              <div class="typeCardContainer" id="typeCardContainer">
              </div>
         </div>
         <div class="imgInterfaceContainer"><img class="imgInterface" src="${pokemonImg}"></div>
     </div>
     <div class="pokemonStats" id="pokemonStats"></div>
     `
}

function returnPokemonStatsHTML(statName, statNumber,type){
    return /*html*/`
    <div class= "statName">${statName}</div>
    <div class="progress">
        <div class="progress-bar ${type}" role="progressbar" style="width: ${statNumber}%">${statNumber}</div>
    </div>`
}