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
    return fetch(pokemon.url).then(response => response.json())
  }
}
