function convertPokemonToLi(pokemon) {
  pokemon.name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1)

  return `
  <li class="pokemon">
    <span class="number">#${
      (pokemon.number < 10 ? '00' : '0') + String(pokemon.number)
    }</span>
    <span class="name">${pokemon.name}</span>

    <div class="detail">
      <ol class="types">
        ${pokemon.types.map(type => `<li class="type">${type}</li>`).join('')}
      </ol>
      <img
        class="pokemonImage"
        src="${pokemon.image}"
        alt="${pokemon.name}"
      />
    </div>
  </li>
  `
}

const pokemonList = document.getElementById('pokemonList')

pokeApi
  .getPokemons()
  .then(pokemons => {
    pokemonList.innerHTML += pokemons
      .map(pokemon => convertPokemonToLi(pokemon))
      .join('')
  })
  .catch(err => console.error(err))
