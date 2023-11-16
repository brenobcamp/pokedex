// const btnTeste = document.getElementById("btnTeste");
// btnTeste.addEventListener("click", function (){
//     console.log("Clicou no botão")
// });

const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
const listPokemons = document.querySelector('#pokemonList')

function convertPokemonToHtml (pokemon){
    return `
    <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
        </li>
    `
}

fetch(url)
    .then(response => response.json())
    .then(jsonBody => jsonBody.results)
    .then(pokemonList => {
        const pokemonsArr = pokemonList.map((pokemon) => {
            return convertPokemonToHtml(pokemon)
        })

        const newHtml = pokemonsArr.join("")

        listPokemons.innerHTML = newHtml

    })
    .catch(function(error) {
        console.error(error)
    })
    .finally( function (){
        console.log("Requisição concluída!");
    });


    // <ol class="types">
                    {/* ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')} */}
                {/* </ol> */}