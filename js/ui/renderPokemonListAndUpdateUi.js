import { state } from "../constants/state";
import { handleOpenModalWithAccessibilityKeys } from "./handleOpenModalWithAccessibilityKeys";
import { renderPokemonCounter } from "./renderPokemonCounter";
import { renderPokemonsList } from "./renderPokemonsList";

export const renderPokemonListAndUpdateUi = () => {
  const pokemonListNode = document.getElementById('pokemon-list');

  if(!pokemonListNode) {
    console.error('Invalid pokemonListNode error');
    return;
  }

  renderPokemonsList({ pokemonList: state.pokemonList, node: pokemonListNode });
  renderPokemonCounter();
  handleOpenModalWithAccessibilityKeys();
};