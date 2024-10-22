import { state } from "../constants/state";
import { handleOpenModalWithAccessibilityKeys } from "../ui/handleOpenModalWithAccessibilityKeys";
import { renderPokemonCounter } from "../ui/renderPokemonCounter";
import { renderPokemonsList } from "../ui/renderPokemonsList";
import { getPokemonFetchedData } from "./getPokemonFetchedData";

export const loadNextPokemonBatchAndUpdateUI = async () => {
  const pokemonListNode = document.getElementById('pokemon-list');
  const loadMoreButton = document.getElementById('load-more');

  if(state.currentOffset >= state.totalPokemon) {
    loadMoreButton.style.display = 'none';
    return;
  }

  await getPokemonFetchedData({ pokemonList: state.allPokemon,
    offset: state.currentOffset, limit: state.limit });

  state.currentOffset = state.pokemonList.length;

  if(state.currentOffset >= state.totalPokemon) {
    loadMoreButton.style.display = 'none';
  } else {
    loadMoreButton.style.display = 'block';
  }

  renderPokemonsList({ pokemonList: state.pokemonList, node: pokemonListNode });
  renderPokemonCounter();
  handleOpenModalWithAccessibilityKeys();
};
