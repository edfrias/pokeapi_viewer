
import { fetchPokemonDetails } from './api/fetchPokemonDetails';
import { state } from './constants/state';

const createPokemonMarkup = (pokemon) => {
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
  `;
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

export const renderPokemonsList = ({ pokemonList, node }) => {
  if (pokemonList.length === 0) {
    listElement.innerHTML = '<p>No Pokémon found. Try different filters or search terms.</p>';
    return
  }

  if (!node || !(node instanceof Element)) {
    console.error('Node was not provided or is invalid.');
  }

  node.innerHTML = pokemonList.map(pokemon => createPokemonMarkup(pokemon)).join('');
}

const renderPokemonModalDetails = (pokemon) => {
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
        if(target) {
          showPokemonDetails(target);
        }
      }
    })
  )
};

export const renderFilters = (filters) => {
  renderColorFilter(filters.colors);
  renderGenderFilter(filters.genders);
  renderTypeFilter(filters.types);
};

const renderColorFilter = (colors) => {
  const colorFilter = document.getElementById('color-filter');

  colorFilter.innerHTML = colors.map(color => `
    <div class="color-box ${color.name}" data-color="${color.name}" style="background-color: ${color.name}" tabindex="0"></div>
  `).join('');
};

const renderGenderFilter = (genders) => {
  const genderFilter = document.getElementById('gender-filter');

  genderFilter.innerHTML = `
    <label tabindex="0"><input type="radio" name="gender" value="" tabindex="0"> All</label>
    ${genders.map(gender => `
      <label  tabindex="0"><input type="radio" name="gender" value="${gender.name}" tabindex="0"> ${gender.name}</label>
    `).join('')}
  `;
};

const renderTypeFilter = (types) => {
  const typeFilter = document.getElementById('type-filter');

  typeFilter.innerHTML = types.map(type => `
    <label><input type="checkbox" name="type" value="${type.name}"> ${type.name}</label>
  `).join('');
};

export const handleColorClick = (event) => {
  console.log('handleColorClick event', event)
  if (event.target.classList.contains('color-box')) {
    const checkIcon = `
      <svg style="pointer-events: none" height="20" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.837 17.837" xml:space="preserve"><path style="fill:#fff" d="M16.145 2.571a.7.7 0 0 0-.99 0L6.92 10.804l-4.241-4.27a.698.698 0 0 0-.989 0L.204 8.019a.703.703 0 0 0 0 .99l6.217 6.258a.704.704 0 0 0 .99 0L17.63 5.047a.7.7 0 0 0 0-.994l-1.485-1.482z"/></svg>
    `;

    if(event.target.classList.contains('selected')) {
      event.target.classList.remove('selected');
      event.target.innerHTML = '';
      state.selectedFilters.color = state.selectedFilters.color.filter(item => item !== event.target.dataset.color);
    } else {
      event.target.classList.add('selected');
      event.target.innerHTML = checkIcon;
      state.selectedFilters.color = Array.from(new Set([...(state.selectedFilters.color), event.target.dataset.color]));
    }
  }
};

export const getSelectedFilters = () => {
  const selectedColors = state.availableFilters.color.filter(color => state.selectedFilters.color.includes(color.name));
  const selectedGender = state.availableFilters.gender.find(gender => gender.name === state.selectedFilters.gender);
  const selectedTypes = state.availableFilters.types.filter(type => state.selectedFilters.types.includes(type.name));

  return {
    colorsFilterData: selectedColors,
    genderFilterData: selectedGender,
    typesFilterData: selectedTypes
  };
};

export const gatherSelectedFiltersData = async (selectedFiltersData) => {
  if(!selectedFiltersData) {
    console.error('There is no filter data provided.');

    return;
  }

  const filterPromises = [];

  selectedFiltersData.colorsFilterData?.forEach(color => filterPromises.push(fetch(color.url).then(res => res.json())));
  selectedFiltersData.genderFilterData && filterPromises.push(fetch(selectedFiltersData.genderFilterData?.url).then(res => res.json()));
  selectedFiltersData.typesFilterData?.forEach(type => filterPromises.push(fetch(type.url).then(res => res.json())));

  const filtersResult = await Promise.all(filterPromises);

  filtersResult.forEach(filter => {
    // Color filter data
    if(filter.pokemon_species?.length) {
      console.log('color');
      filter.pokemon_species.forEach(filteredPokemon => {
        const nationalPokemonFiltered = state.allPokemon.find(nationalPokemon => nationalPokemon.pokemon_species.name === filteredPokemon.name);

        if(nationalPokemonFiltered) {
          state.filteredPokemons = Array.from(new Set([...state.filteredPokemons, nationalPokemonFiltered]));
        }
      })
    }

    // Gender filter data
    if(filter.pokemon_species_details?.length) {
      console.log('gender');
      filter.pokemon_species_details.forEach(filteredPokemon => {
        const nationalPokemonFiltered = state.allPokemon.find(nationalPokemon => nationalPokemon.pokemon_species.name === filteredPokemon.pokemon_species.name);

        if(nationalPokemonFiltered) {
          state.filteredPokemons = Array.from(new Set([...state.filteredPokemons, nationalPokemonFiltered]));
        }
      })
    }

    // Types filter data
    if(filter.pokemon?.length) {
      console.log('types');
      filter.pokemon.forEach(filteredPokemon => {
        const nationalPokemonFiltered = state.allPokemon.find(nationalPokemon => nationalPokemon.pokemon_species.name === filteredPokemon.pokemon.name);

        if(nationalPokemonFiltered) {
          state.filteredPokemons = Array.from(new Set([...state.filteredPokemons, nationalPokemonFiltered]));
        }
      })
    }
  });

  console.log(state)
};

export const resetFilters = async () => {
  state.selectedFilters = {
    color: [],
    gender: '',
    types: []
  };

  state.searchTerm = '';
  state.currentOffset = 0;
  state.pokemonList = [];

  document.getElementById('search-input').value = '';
  document.querySelectorAll('.color-box').forEach(box => {
    box.classList.remove('selected');
    box.innerHTML = '';
  });
  document.querySelector('input[name="gender"][value=""]').checked = true;
  document.querySelectorAll('input[name="type"]').forEach(filter => filter.checked = false);
};