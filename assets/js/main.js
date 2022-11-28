const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
let offset = 0
const limit = 50
const maxRecords = 151 // number of first generation pokemons

// to adjust pokemon order number to 3 digits
function adjustPokemonOrder(order) {
  if (order < 10) {
    order = '00' + String(order)
  } else if (order > 9 && order < 100) {
    order = '0' + String(order)
  }
  return order
}

function loadMorePokemons(offset, limit) {
  pokeApi
    .getPokemons(offset, limit)
    .then((pokemons = []) => {
      // DIO method, based on a new const newHtml
      // const newHtml = pokemons.map(convertPokemonToLi).join('')
      // pokemonList.innerHTML = newHtml
      pokemonList.innerHTML += pokemons
        .map(
          pokemon => `
          <li class="pokemon ${pokemon.type}">
            <span class="number">#${adjustPokemonOrder(pokemon.number)}</span>
            <span class="name">${pokemon.name}</span>
        
            <div class="detail">
              <ol class="types">
                ${pokemon.types
                  .map(type => `<li class="type ${pokemon.type}">${type}</li>`)
                  .join('')}
              </ol>
              <img
                class="pokemonImage"
                src="${pokemon.image}"
                alt="${pokemon.name}"
              />
            </div>
          </li>
          `
        )
        .join('')
    })
    .catch(err => console.error(err))
}

loadMorePokemons(offset, limit)

const divBtn = document.getElementById('pagination')
const div = document.createElement('div')
div.innerHTML = '<small>offset is out of range</small>'

loadMoreButton.addEventListener('click', () => {
  offset += limit
  const qttRecordsNextPage = offset + limit
  // to limit offset to the number of 1st generation pokemons (151)

  // method 1: first conditional based on qttRecordsNextPage <= maxRecords
  // if (qttRecordsNextPage <= maxRecords) {
  //   loadMorePokemons(offset, limit)
  // } else if (maxRecords - offset == 0) {
  //   divBtn.insertBefore(div, loadMoreButton)
  //   loadMoreButton.remove()
  // } else {
  //   const newLimit = maxRecords - offset
  //   loadMorePokemons(offset, newLimit)
  //   divBtn.insertBefore(div, loadMoreButton)
  //   loadMoreButton.remove()
  // }

  if (qttRecordsNextPage >= maxRecords) {
    const newLimit = maxRecords - offset

    loadMorePokemons(offset, newLimit)
    divBtn.insertBefore(div, loadMoreButton)
    loadMoreButton.remove()
  } else {
    loadMorePokemons(offset, limit)
  }
})
