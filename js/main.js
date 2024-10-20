import '../assets/css/styles.less'
import { debounce } from "./utilities/debounce";
import { fetchPokemonList, getPokemonFetchedData } from './api.js';
import { renderPokemonsList } from './ui.js';

const loadNextPokemonBatch = () => {
  console.log('loadPokemon');
};

const applyFilters = () => {
  console.log('applyFilters');
};

const showPokemonDetails = () => {
  console.log('showPokemonDetails');
};

const closeModal = () => {
  console.log('closeModal');
};

const handleSearch = async (event) => {
  const searchTerm = event?.target.value.trim().toLowerCase();


  console.log('handleSearchDebounced', searchTerm);
};

const handleColorClick = () => {
  console.log('handleColorClick');
};

(async function initApp() {
  const initialBatch = await getPokemonFetchedData({ pokemonList: await fetchPokemonList()});

  const loadMoreButton = document.getElementById('load-more');
  const applyFiltersButton = document.getElementById('apply-filters');
  const pokemonListNode = document.getElementById('pokemon-list');
  const modalCloseButton = document.querySelector('.modal .close');
  const searchInputNode = document.getElementById('search-input');
  const colorFilterNode = document.getElementById('color-filter');

  renderPokemonsList({ pokemonList: initialBatch, node: pokemonListNode });

  loadMoreButton.addEventListener('click', loadNextPokemonBatch);
  applyFiltersButton.addEventListener('click', applyFilters);
  pokemonListNode.addEventListener('click', showPokemonDetails);
  modalCloseButton.addEventListener('click', closeModal);
  searchInputNode.addEventListener('input', debounce(handleSearch, 500));
  colorFilterNode.addEventListener('click', handleColorClick);
})();
