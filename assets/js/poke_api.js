function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  // the array types has only the types names as property:
  const types = pokeDetail.types.map(typeSlot => typeSlot.type.name)
  const [type] = types

  pokemon.name = pokeDetail.name
  pokemon.number = pokeDetail.order
  pokemon.types = types
  pokemon.type = type
  pokemon.image = pokeDetail.sprites.other.dream_world.front_default

  return pokemon
}

const pokeApi = {
  getPokemons: (offset = 1, limit = 50) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

    return fetch(url)
      .then(response => response.json())
      .then(jsonBody => jsonBody.results)
      .then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
      .then(detailRequest => Promise.all(detailRequest))
      .catch(error => console.error(error))
  },

  getPokemonDetail: pokemon => {
    return fetch(pokemon.url)
      .then(response => response.json())
      .then(convertPokeApiDetailToPokemon)
  }
}
