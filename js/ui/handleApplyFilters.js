import { getPokemonFetchedData } from "../api/getPokemonFetchedData";
import { state } from "../constants/state";
import { gatherSelectedFiltersData } from "./gatherSelectedFiltersData";
import { getSelectedFilters } from "./getSelectedFilters";
import { renderPokemonListAndUpdateUi } from "./renderPokemonListAndUpdateUi";

export const handleApplyFilters = async () => {
  const pokemonListNode = document.getElementById('pokemon-list');
  const spinnerNode = document.getElementById('loading');

  if(!pokemonListNode || !spinnerNode) {
    console.error('Invalid node error');
    return;
  }

  pokemonListNode.innerHTML = '';
  state.selectedFilters.gender = document.querySelector('input[name="gender"]:checked')?.value;
  state.selectedFilters.types = Array.from(document.querySelectorAll('input[name="type"]:checked'))?.map(filter => filter.value);
  state.currentOffset = 0;
  state.pokemonList = [];
  state.filteredPokemons = [];

  spinnerNode.style.display = 'flex';

  await gatherSelectedFiltersData(getSelectedFilters());

  await getPokemonFetchedData({ pokemonList: state.filteredPokemons,
    offset: 0, limit: 1000 });

  spinnerNode.style.display = 'none';
  renderPokemonListAndUpdateUi();
};