function createPokemonMarkup(pokemon) {
  if(!pokemon) {
    console.error(`No pokemon information was provided for ${pokemon}`);
  }

  return `
    <div class="pokemon" style="${generatePokemonCardBgColor(pokemon)}">
      <div class="pokemon__img-container">
          <img class="pokemon__img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="Image for pokemon ${pokemon.name}">
      </div>
      <div class="pokemon__info">
          <span class="pokemon__info__number">#${pokemon.id.toString().padStart(4, '0')}</span>
          <h3 class="pokemon__info__name">${pokemon.name}</h3>
          <small class="pokemon__info__type">Types: <span>${pokemon.types.join(', ')}</span></small>
      </div>
    </div>
  `
}

const generatePokemonCardBgColor = (pokemon) => {
  if(pokemon) {
    if(pokemon.types.length === 1) {
      return `--typeColor:var(--type-${pokemon.types[0]}); --secondary-typeColor:var(--type-${pokemon.types[0]});`;
    }

    if(pokemon.types.length > 1) {
      return `--typeColor:var(--type-${pokemon.types[0]}); --secondary-typeColor:var(--type-${pokemon.types[1]});`;
    }
  }
};

export function renderPokemonsList({ pokemonList, node }) {
  if (pokemonList.length === 0) {
    listElement.innerHTML = '<p>No Pokémon found. Try different filters or search terms.</p>'
    return
  }

  if (!node || !(node instanceof Element)) {
    console.error('Node was not provided or is invalid.');
  }

  node.innerHTML = pokemonList.map(pokemon => createPokemonMarkup(pokemon)).join('');
}
