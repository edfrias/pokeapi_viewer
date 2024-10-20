import '../assets/css/styles.less'
import { state } from './state';
import { debounce } from "./utilities/debounce";
import { fetchPokemonNationalData, getPokemonFetchedData } from './api.js';
import { handleOpenModalWithAccessibilityKeys, renderPokemonsList, showPokemonDetails } from './ui.js';

const initApp = async () => {
  await fetchPokemonNationalData().then((res) => res.pokemon_entries);
  const initialBatch = await getPokemonFetchedData({
    pokemonList: state.allPokemon, offset: 0, limit: 20
  });

  console.log('initial state', state)

  const loadMoreButton = document.getElementById('load-more');
  const applyFiltersButton = document.getElementById('apply-filters');
  const pokemonListNode = document.getElementById('pokemon-list');
  const searchInputNode = document.getElementById('search-input');
  const colorFilterNode = document.getElementById('color-filter');

  renderPokemonsList({ pokemonList: initialBatch, node: pokemonListNode });
  handleOpenModalWithAccessibilityKeys();

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

const applyFilters = () => {
  console.log('applyFilters');
};

const handlePokemonImgClick = async (event) => {
  const target = event.target;
  await showPokemonDetails(target);
};

const handleSearch = async (event) => {
  const searchTerm = event?.target.value.trim().toLowerCase();
  console.log('handleSearchDebounced', searchTerm);
};

const handleColorClick = () => {
  console.log('handleColorClick');
};

initApp();
