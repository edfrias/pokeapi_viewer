import '../assets/css/styles.less'
import { state } from './constants/state.js';
import { fetchPokemonNationalData } from './api/fetchPokemonNationalData.js'
import { getPokemonFetchedData } from './api/getPokemonFetchedData.js';
import { fetchFilterOptions } from './api/fetchFilterOptions.js';
import { gatherSelectedFiltersData } from './ui/gatherSelectedFiltersData.js';
import { getSelectedFilters } from './ui/getSelectedFilters.js';
import { handleColorClick } from './ui/handleColorClick.js';
import { handleOpenModalWithAccessibilityKeys } from './ui/handleOpenModalWithAccessibilityKeys.js';
import { renderFilters } from './ui/renderFilters.js';
import { renderPokemonsList } from './ui/renderPokemonsList.js'
import { resetFilters } from './ui/resetFilters.js';
import { showPokemonDetails } from './ui/showPokemonDetails.js';
import { debounce } from "./utilities/debounce";

const initApp = async () => {
  await fetchPokemonNationalData().then((res) => res.pokemon_entries);
  const initialBatch = await getPokemonFetchedData({
    pokemonList: state.allPokemon, offset: 0, limit: 20
  });

  const filters = await fetchFilterOptions();
  console.log(state)
  renderFilters(filters);

  const loadMoreButton = document.getElementById('load-more');
  const applyFiltersButton = document.getElementById('apply-filters');
  const pokemonListNode = document.getElementById('pokemon-list');
  const searchInputNode = document.getElementById('search-input');
  const colorFilterNode = document.getElementById('color-filter');
  const resetFiltersButton = document.getElementById('reset-filters');

  renderPokemonsList({ pokemonList: initialBatch, node: pokemonListNode });

  handleOpenModalWithAccessibilityKeys();
  resetFiltersButton.addEventListener('click', resetFilters);
  loadMoreButton.addEventListener('click', loadNextPokemonBatchAndUpdateUI);
  applyFiltersButton.addEventListener('click', applyFilters);
  pokemonListNode.addEventListener('click', handlePokemonImgClick);
  searchInputNode.addEventListener('input', debounce(handleSearch, 500));
  colorFilterNode.addEventListener('click', handleColorClick);
};

const loadNextPokemonBatchAndUpdateUI = async () => {
  const pokemonListNode = document.getElementById('pokemon-list');
  const loadMoreButton = document.getElementById('load-more');

  if(state.currentOffset >= state.totalPokemon) {
    loadMoreButton.style.display = 'none';
    return;
  }

  await getPokemonFetchedData({ pokemonList: state.allPokemon,
    offset: state.currentOffset, limit: state.limit });

  state.currentOffset += state.limit;

  if(state.currentOffset >= state.totalPokemon) {
    loadMoreButton.style.display = 'none';
  } else {
    loadMoreButton.style.display = 'block';
  }

  renderPokemonsList({ pokemonList: state.pokemonList, node: pokemonListNode });
  handleOpenModalWithAccessibilityKeys();
};

const handlePokemonImgClick = async (event) => {
  const target = event.target;
  await showPokemonDetails(target);
};

const handleSearch = async (event) => {
  const searchTerm = event?.target.value.trim().toLowerCase();
  console.log('handleSearchDebounced', searchTerm);
};

export const applyFilters = async() => {
  const pokemonListNode = document.getElementById('pokemon-list');
  pokemonListNode.innerHTML = '';
  state.selectedFilters.gender = document.querySelector('input[name="gender"]:checked')?.value;
  state.selectedFilters.types = Array.from(document.querySelectorAll('input[name="type"]:checked'))?.map(filter => filter.value);
  state.currentOffset = 0;
  state.pokemonList = [];
  state.filteredPokemons = [];

  await gatherSelectedFiltersData(getSelectedFilters());

  await getPokemonFetchedData({ pokemonList: state.filteredPokemons,
    offset: 0, limit: 1000 });

  renderPokemonsList({ pokemonList: state.pokemonList, node: pokemonListNode });
};

initApp();
