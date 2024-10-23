import { filterSearch } from "../api/filterSearch";
import { getPokemonFetchedData } from "../api/getPokemonFetchedData";
import { state } from "../constants/state";
import { renderPokemonListAndUpdateUi } from "./renderPokemonListAndUpdateUi";

export const handleSearch = async (event) => {
  if(!event) {
    console.error('No criteria was provided');
    return;
  }

  const pokemonListNode = document.getElementById('pokemon-list');

  if(!pokemonListNode) {
    console.error('Invalid pokemonListNode error');
    return;
  }

  pokemonListNode.innerHTML = '';

  const searchTerm = event?.target.value.trim().toString().toLowerCase();

  if(!searchTerm) {
    console.error('Invalid searchTerm error');
    return;
  }

  const pokemonsToSearch = filterSearch(searchTerm);

  if(!pokemonsToSearch) {
    console.error('Invalid pokemonsToSearch error');
    return;
  }

  state.currentOffset = 0;
  state.pokemonList = [];
  state.filteredPokemons = [];
  state.searchTerm = searchTerm;
  state.filteredPokemons = pokemonsToSearch;

  await getPokemonFetchedData({ pokemonList: state.filteredPokemons, offset: 0, limit: 1000 });

  renderPokemonListAndUpdateUi();
};
