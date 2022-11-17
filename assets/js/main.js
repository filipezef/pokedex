function convertPokemonTypesToLi(pokemonTypes) {
  return pokemonTypes
    .map(typeSlot => `<li class="type">${typeSlot.type.name}</li>`)
    .join('')
}

function convertPokemonToLi(pokemon) {
  pokemon.name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1)
  return `
  <li class="pokemon">
    <span class="number">#${
      (pokemon.order < 10 ? '00' : '0') + String(pokemon.order)
    }</span>
    <span class="name">${pokemon.name}</span>

    <div class="detail">
      <ol class="types">
        ${convertPokemonTypesToLi(pokemon.types)}
      </ol>
      <img
        class="pokemonImage"
        src="${pokemon.sprites.other.dream_world.front_default}"
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
