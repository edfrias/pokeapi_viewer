import { getPokemonFetchedData } from "../api/getPokemonFetchedData";
import { state } from "../constants/state";
import { gatherSelectedFiltersData } from "./gatherSelectedFiltersData";
import { getSelectedFilters } from "./getSelectedFilters";
import { renderPokemonCounter } from "./renderPokemonCounter";
import { renderPokemonsList } from "./renderPokemonsList";

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
  renderPokemonCounter();
};