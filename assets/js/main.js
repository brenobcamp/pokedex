let offset = 0;
const limit = 20;
const maxRecords = 151;
const listPokemons = document.querySelector('#pokemonList')
const loadMoreBtn = document.querySelector('#loadMoreButton');

function convertPokemonToHtml (pokemon){
    return `
    <li class="pokemon ${pokemon.type}">
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
