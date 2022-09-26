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

function returnHeadInterfaceHTML(i, pokemonName, pokemonImg, pokemonWeight, pokemontHeight) {
    return /*html*/ `
    <div class="headInterface">
        <div class="headInfo">
              <div class="nameID">
                  <div class="idInterface">#${i}</div>
                  <div class="nameInterface">${pokemonName}</div>
              </div>
              <div class="measureAndTypeContainer">
                  <div class="heightWeight">
                      <div class="measure">Weight: ${pokemonWeight}</div>
                      <div class="measure">Height: ${pokemontHeight}</div>
                  </div>
                  <div class="typeCardContainer" id="typeCardContainer">
                  </div>
              </div>
         </div>
         <div class="imgInterfaceContainer"><img class="imgInterface" src="${pokemonImg}"></div>
     </div>
     <div class="pokemonStats" id="pokemonStats"></div>
     `
}

function returnPokemonStatsHTML(statName, statNumber, type) {
    return /*html*/`
    <div class= "statName">${statName}</div>
    <div class="progress">
        <div class="progress-bar ${type}" role="progressbar" style="width: ${statNumber}%">${statNumber}</div>
    </div>`
}

function returnDetailInterfaceNavHTML(i) {
    return /*html*/`
    <div class="detailNav"> 
       <div class="closeDetailIntervace">
          <img onclick="closeDetailInterface(${i})" class="closeBtn" src="img/close.png" alt="close">
       </div>
       <div class="nextPrev">
          <img onclick="previousPokemon(${i}) "class="previousBtn" id="previousBtn" src="img/previous.png" alt="previous">
          <img onclick="nextPokemon(${i})"class="nextBtn" id="nextBtn" src="img/next.png" alt="next">
       </div>
    </div>
     `
}