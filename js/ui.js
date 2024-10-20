import { fetchPokemonDetails } from "./api";

function createPokemonMarkup(pokemon) {
  if(!pokemon) {
    console.error(`No pokemon information was provided for ${pokemon}`);
  }

  return `
    <div class="pokemon" style="${generatePokemonCardBgColor(pokemon)}" tabindex="0">
      <div class="pokemon__img-container">
          <img class="pokemon__img" data-id="${pokemon.id}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="Image for pokemon ${pokemon.name}">
      </div>
      <div class="pokemon__info">
          <span class="pokemon__info__number">#${pokemon.id.toString().padStart(4, '0')}</span>
          <h3 class="pokemon__info__name">${pokemon.name}</h3>
          <small class="pokemon__info__type">Type: <span>${pokemon.types.join(', ')}</span></small>
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

export function renderPokemonModalDetails(pokemon) {
  const pokemonDetails = document.getElementById('pokemon-details');

  pokemonDetails.innerHTML = `
    <h2>${pokemon.name} #${pokemon.id.toString().padStart(4, '0')}</h2>
    <img width="475" height="475" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" class="pokemon-image">
    <p>Height: ${pokemon.height / 10}m</p>
    <p>Weight: ${pokemon.weight / 10}kg</p>
    <p>Types: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
    <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
  `;
}

export const showPokemonDetails = async (node) => {
  if (node.classList.contains('pokemon__img')) {
    const pokemonId = node.dataset.id;
    const details = await fetchPokemonDetails(pokemonId);
    const modal = document.getElementById('modal');

    renderPokemonModalDetails(details);
    modal.style.display = 'block';
    modal.querySelector('.close').addEventListener('click', closeModal);
    document.addEventListener('keydown', handleEscKey);
  }
};

export const closeModal = () => {
  document.getElementById('modal').style.display = 'none';
  document.removeEventListener('keydown', handleEscKey);
};

const handleEscKey = (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
};

export const handleOpenModalWithAccessibilityKeys = () => {
  const pokemonNodes = document.querySelectorAll(".pokemon");

  pokemonNodes.forEach(node =>
    node.addEventListener('keydown', function(event) {
      if ((event.key === 'Enter' || event.keyCode === 13) ||
      (event.key === ' ' || event.keyCode === 32)) {
        event.preventDefault();
        const target = event.target.getElementsByClassName('pokemon__img')[0];
        showPokemonDetails(target);
      }
    })
  )
};