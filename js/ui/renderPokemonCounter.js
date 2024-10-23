import { state } from "../constants/state";

export const renderPokemonCounter = () => {
  const pokemonCounter = document.getElementsByClassName('pokemon-count')[0];

  if(!pokemonCounter) {
    console.error('Invalid pokemonCounter error');
    return;
  }

  pokemonCounter.innerHTML = `
    <span class="pokemon-count__pokemon__number">${state.pokemonList.length}</span> Pokémon displayed
  `;
};
