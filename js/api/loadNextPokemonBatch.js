import { state } from "../constants/state";
import { getPokemonFetchedData } from "./getPokemonFetchedData";

export const loadNextPokemonBatch = async () => {
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
};
