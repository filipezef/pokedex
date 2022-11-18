function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.name = pokeDetail.name
  pokemon.number = pokeDetail.order

  const types = pokeDetail.types.map(typeSlot => typeSlot.type.name)
  const [type] = types
  //const typeTest = types.get(0) -> this does not work (error get is not a function)
  //console.log(typeTest) -> this does not work
  //const type = types.get(0)
  //const type = types[0]
  //pokemon.type = pokeDetail.types[0].type.name
  //pokemon.types = pokeDetail.types.map(typeSlot => typeSlot.type.name)

  pokemon.types = types
  pokemon.type = type

  pokemon.image = pokeDetail.sprites.other.dream_world.front_default

  return pokemon
}

const pokeApi = {
  getPokemons: (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

    return fetch(url)
      .then(response => response.json())
      .then(jsonBody => jsonBody.results)
      .then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
      .then(detailRequest => Promise.all(detailRequest))
      .catch(error => console.error(error))
  },

  getPokemonDetail: pokemon => {
    return (
      fetch(pokemon.url)
        .then(response => response.json())
        // .then(pokemon => {
        //   convertPokeApiDetailToPokemon(pokemon)
        // })
        // the code above may be replaced with the one below:
        .then(convertPokeApiDetailToPokemon)
    )
  }
}
