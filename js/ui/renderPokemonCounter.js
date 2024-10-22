import { state } from "../constants/state";

export const renderPokemonCounter = () => {
  const pokemonCounter = document.getElementsByClassName('pokemon-count')[0];

  pokemonCounter.innerHTML = `
    <span class="pokemon-count__pokemon__number">${state.pokemonList.length}</span> Pokémon displayed
  `;
};
