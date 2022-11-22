const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
let offset = 0
const limit = 5

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

const div = document.createElement('div')
div.innerText = 'offset is out of range'
const body = document.querySelector('body')
const divBtn = document.getElementById('pagination')

loadMoreButton.addEventListener('click', () => {
  offset += limit
  console.log(offset)
  // to limit offset to the number of 1st generation pokemons (151)
  if (offset < 15) {
    loadMorePokemons(offset, limit)
  } else {
    console.log('offset is out of range')
    divBtn.insertBefore(div, loadMoreButton)
    loadMoreButton.remove()
  }
})
