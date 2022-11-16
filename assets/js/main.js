// const offset = 0
// const limit = 10
// const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

function convertPokemonToLi(pokemon, id) {
  pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.substring(1)
  return `
  <li class="pokemon">
    <span class="number">#${(id < 10 ? '00' : '0') + String(id)}</span>
    <span class="name">${pokemonName}</span>

    <div class="detail">
      <ol class="types">
        <li class="type">grass</li>
        <li class="type">poison</li>
      </ol>
      <img
        class="pokemonImage"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg"
        alt="${pokemonName}"
      />
    </div>
  </li>
  `
}

const pokemonList = document.getElementById('pokemonList')
/*const pokemonList = document.getElementsByClassName('pokemons')
 the above code would work the same way, just replact pokemonList on the 3rd .then of the fetch bt pokemonList[0]
 the difference is that the getElementsByClassName returns a collection, while the getElementsById returns just a single element
*/

pokeApi
  .getPokemons()
  .then(pokemons => {
    /*
      first solution based on for loop (not very efficient since the browser has to go through all the list in all loops)
      for (let i = 0; i < pokemons.length; i++) {
      t pokemonList.innerHTML += convertPokemonToHtml(pokemons[i], i + 1)
      }

      instructor's solution:
      const newList = pokemons.map((pokemon) => convertPokemonToLi(pokemon))

      const newHtml = newList.join('')

      pokemonList.innerHTML += newHtml

      The above code can be simplified further:
      const newList = pokemons.map((pokemon) => convertPokemonToLi(pokemon)) => const newList = pokemons.map(convertPokemonToLi).join('')

      The result is a single liner:
      pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')

    */

    //my solution, using also the indexOf() function to grab the element index and use it on the interface
    pokemonList.innerHTML += pokemons
      .map(pokemon =>
        convertPokemonToLi(pokemon, pokemons.indexOf(pokemon) + 1)
      )
      .join('')
  })
  .catch(err => console.error(err))
