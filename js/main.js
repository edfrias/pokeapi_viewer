import '../assets/css/styles.less'
import { state } from './constants/state.js';
import { fetchPokemonNationalData } from './api/fetchPokemonNationalData.js'
import { getPokemonFetchedData } from './api/getPokemonFetchedData.js';
import { fetchFilterOptions } from './api/fetchFilterOptions.js';
import { handleColorClick } from './ui/handleColorClick.js';
import { renderFilters } from './ui/renderFilters.js';
import { handleResetFilters } from './ui/handleResetFilters.js';
import { debounce } from "./utilities/debounce";
import { handleApplyFilters } from './ui/handleApplyFilters.js';
import { handlePokemonImgClick } from './ui/handlePokemonImgClick.js';
import { handleSearch } from './ui/handleSearch.js';
import { handleResponsiveMenuVisibility } from './ui/handleResponsiveMenuVisibility.js';
import { handleLoadMoreAndUpdateUi } from './ui/handleLoadMoreAndUpdateUi.js';
import { renderPokemonListAndUpdateUi } from './ui/renderPokemonListAndUpdateUi.js';

const initApp = async () => {
  await fetchPokemonNationalData().then((res) => res.pokemon_entries);
  await getPokemonFetchedData({
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

  resetFiltersButton.addEventListener('click', handleResetFilters);
  loadMoreButton.addEventListener('click', handleLoadMoreAndUpdateUi);
  applyFiltersButton.addEventListener('click', handleApplyFilters);
  pokemonListNode.addEventListener('click', handlePokemonImgClick);
  searchInputNode.addEventListener('input', debounce(handleSearch, 500));
  colorFilterNode.addEventListener('click', handleColorClick);
  menuTrigger.addEventListener('click', handleResponsiveMenuVisibility);

  renderPokemonListAndUpdateUi();
};

initApp();
