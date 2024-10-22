import { createPokemonMarkup } from "./createPokemonMarkup";

export const renderPokemonsList = ({ pokemonList, node }) => {
  if (!pokemonList || pokemonList.length === 0) {
    node.classList.add('no-results');
    node.innerHTML = '<p class="no-results__text">No Pokémon found. Try different filters or search terms.</p>';
    return;
  }

  if (!node || !(node instanceof Element)) {
    console.error('Node was not provided or is invalid.');
  }

  node.innerHTML = pokemonList.map(pokemon => createPokemonMarkup(pokemon)).join('');
};
