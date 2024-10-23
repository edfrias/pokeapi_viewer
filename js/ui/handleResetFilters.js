import { state } from "../constants/state";
import { getPokemonFetchedData } from "../api/getPokemonFetchedData";
import { renderPokemonListAndUpdateUi } from "./renderPokemonListAndUpdateUi";

export const handleResetFilters = async () => {
  const pokemonListNode = document.getElementById('pokemon-list');

  if(!pokemonListNode) {
    console.error('Invalid node error');
    return;
  }

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
  document.querySelectorAll('input[name="gender"]').forEach(filter => filter.checked = false);
  document.querySelectorAll('input[name="type"]').forEach(filter => filter.checked = false);
  const initialBatch = await getPokemonFetchedData({
    pokemonList: state.allPokemon, offset: 0, limit: 20
  });
  state.pokemonList = [...initialBatch];
  renderPokemonListAndUpdateUi();
};