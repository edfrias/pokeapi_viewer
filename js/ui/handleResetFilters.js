import { state } from "../constants/state";
import { getPokemonFetchedData } from "../api/getPokemonFetchedData";
import { renderPokemonsList } from "./renderPokemonsList";
import { renderPokemonCounter } from "./renderPokemonCounter";

export const handleResetFilters = async () => {
  const pokemonListNode = document.getElementById('pokemon-list');

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
  renderPokemonsList({ pokemonList: initialBatch, node: pokemonListNode });
  renderPokemonCounter();
};