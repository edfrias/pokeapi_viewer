import { filterSearch } from "../api/filterSearch";
import { getPokemonFetchedData } from "../api/getPokemonFetchedData";
import { state } from "../constants/state";
import { renderPokemonCounter } from "./renderPokemonCounter";
import { renderPokemonsList } from "./renderPokemonsList";

export const handleSearch = async (event) => {
  if(!event) {
    console.error('No criteria was provided in order to search');
  }

  const pokemonListNode = document.getElementById('pokemon-list');
  pokemonListNode.innerHTML = '';

  const searchTerm = event?.target.value.trim().toString().toLowerCase();
  const pokemonsToSearch = filterSearch(searchTerm);

  state.currentOffset = 0;
  state.pokemonList = [];
  state.filteredPokemons = [];
  state.searchTerm = searchTerm;
  state.filteredPokemons = pokemonsToSearch;

  await getPokemonFetchedData({ pokemonList: state.filteredPokemons, offset: 0, limit: 1000 });

  renderPokemonsList({ pokemonList: state.pokemonList, node: pokemonListNode });
  renderPokemonCounter();
};
