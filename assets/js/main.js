let offset = 0;
const limit = 20;
const maxRecords = 151;
const listPokemons = document.querySelector('#pokemonList')
const loadMoreBtn = document.querySelector('#loadMoreButton');
const janelaPopup = document.createElement('div');
const divFecharJanelaPopup = document.createElement('div');
const divNomeImagemPokemon = document.createElement('div');
const divDetalhesPokemon = document.createElement('div');
const botaoFechar = document.createElement('button');
const divFundoFalso = document.createElement('div');
divFundoFalso.classList.add('fundo-falso');
botaoFechar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>';
botaoFechar.onclick = function () { 
    document.body.removeChild(janelaPopup) 
    document.body.removeChild(divFundoFalso)
}

async function mostrarPopUp (pokemonNumber) {
    document.body.appendChild(divFundoFalso)
    const pokemonDetail = await PokeApi.getPokemonById(pokemonNumber)
    janelaPopup.className = `popup ${pokemonDetail.type}`;

    divFecharJanelaPopup.appendChild(botaoFechar)
    janelaPopup.appendChild(divFecharJanelaPopup)
    
    divNomeImagemPokemon.innerHTML = `
    <h1>${pokemonDetail.name}</h1><br>
    <img src="${pokemonDetail.photo}">
    `
    janelaPopup.appendChild(divNomeImagemPokemon)

    divDetalhesPokemon.className = `conteudo-popup ${pokemonDetail.type}`
    divDetalhesPokemon.innerHTML = `
        <h2>About</h2>
        <h3>Type: ${pokemonDetail.type}</h3>
        <h3>Weight: ${pokemonDetail.weight}</h3>
        <h3>Height: ${pokemonDetail.height}</h3>
    `
    janelaPopup.appendChild(divDetalhesPokemon);
    document.body.appendChild(janelaPopup)
}

window.addEventListener('click', (event) => {
    if (event.target.classList == 'fundo-falso'){
        document.body.removeChild(janelaPopup) 
        document.body.removeChild(divFundoFalso)
    }
})


function convertPokemonToHtml (pokemon){
    return `
    <li class="pokemon ${pokemon.type}" onclick="mostrarPopUp(${pokemon.number})">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}"
                 alt="${pokemon.name}">
        </div>
    </li>
`
}


function loadPokemonItens(offset, limit) {
    PokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((convertPokemonToHtml)).join('')
        listPokemons.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

function clearPokemons() {
    listPokemons.innerHTML = ""
}

loadMoreBtn.addEventListener('click', () => {
    offset += limit
    const qtdRecordsNextPage = offset + limit

    if (qtdRecordsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreBtn.parentElement.removeChild(loadMoreBtn)
    } else {
        loadPokemonItens(offset, limit)
    }
})
