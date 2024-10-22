import '../assets/css/styles.less'
import { state } from './constants/state.js';
import { fetchPokemonNationalData } from './api/fetchPokemonNationalData.js'
import { getPokemonFetchedData } from './api/getPokemonFetchedData.js';
import { fetchFilterOptions } from './api/fetchFilterOptions.js';
import { handleColorClick } from './ui/handleColorClick.js';
import { handleOpenModalWithAccessibilityKeys } from './ui/handleOpenModalWithAccessibilityKeys.js';
import { renderFilters } from './ui/renderFilters.js';
import { renderPokemonsList } from './ui/renderPokemonsList.js'
import { resetFilters } from './ui/resetFilters.js';
import { debounce } from "./utilities/debounce";
import { renderPokemonCounter } from './ui/renderPokemonCounter.js';
import { applyFilters } from './ui/applyFilters.js';
import { handlePokemonImgClick } from './ui/handlePokemonImgClick.js';
import { loadNextPokemonBatchAndUpdateUI } from './api/loadNextPokemonBatchAndUpdateUI.js';
import { handleSearch } from './ui/handleSearch.js';
import { handleResponsiveMenuVisibility } from './ui/handleResponsiveMenuVisibility.js';

const initApp = async () => {
  await fetchPokemonNationalData().then((res) => res.pokemon_entries);
  const initialBatch = await getPokemonFetchedData({
    pokemonList: state.allPokemon, offset: 0, limit: 20
  });

  const filters = await fetchFilterOptions();
  renderFilters(filters);

  const loadMoreButton = document.getElementById('load-more');
  const applyFiltersButton = document.getElementById('apply-filters');
  const pokemonListNode = document.getElementById('pokemon-list');
  const searchInputNode = document.getElementById('search-input');
  const colorFilterNode = document.getElementById('color-filter');
  const resetFiltersButton = document.getElementById('reset-filters');
  const menuTrigger = document.getElementById('menu-trigger');

  resetFiltersButton.addEventListener('click', resetFilters);
  loadMoreButton.addEventListener('click', loadNextPokemonBatchAndUpdateUI);
  applyFiltersButton.addEventListener('click', applyFilters);
  pokemonListNode.addEventListener('click', handlePokemonImgClick);
  searchInputNode.addEventListener('input', debounce(handleSearch, 500));
  colorFilterNode.addEventListener('click', handleColorClick);
  menuTrigger.addEventListener('click', handleResponsiveMenuVisibility);

  renderPokemonsList({ pokemonList: initialBatch, node: pokemonListNode });
  renderPokemonCounter();
  handleOpenModalWithAccessibilityKeys();
};

initApp();
