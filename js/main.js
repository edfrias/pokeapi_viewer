import '../assets/css/styles.less'
import { debounce } from "./utilities/debounce";
import { fetchPokemonList, getPokemonFetchedData } from './api.js';

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
  console.log('initialBatch', initialBatch);
  document.getElementById('load-more').addEventListener('click', loadNextPokemonBatch);
  document.getElementById('apply-filters').addEventListener('click', applyFilters);
  document.getElementById('pokemon-list').addEventListener('click', showPokemonDetails);
  document.querySelector('.modal .close').addEventListener('click', closeModal);
  document.getElementById('search-input').addEventListener('input', debounce(handleSearch, 500));
  document.getElementById('color-filter').addEventListener('click', handleColorClick);
})();
