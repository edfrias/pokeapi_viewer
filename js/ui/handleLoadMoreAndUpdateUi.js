import { loadNextPokemonBatch } from "../api/loadNextPokemonBatch";
import { renderPokemonListAndUpdateUi } from "./renderPokemonListAndUpdateUi";

export const handleLoadMoreAndUpdateUi = async () => {
  await loadNextPokemonBatch();
  renderPokemonListAndUpdateUi();
};
