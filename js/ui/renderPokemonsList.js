import { createPokemonMarkup } from "./createPokemonMarkup";

export const renderPokemonsList = ({ pokemonList, node }) => {
  if (pokemonList.length === 0) {
    listElement.innerHTML = '<p>No Pokémon found. Try different filters or search terms.</p>';
    return
  }

  if (!node || !(node instanceof Element)) {
    console.error('Node was not provided or is invalid.');
  }

  node.innerHTML = pokemonList.map(pokemon => createPokemonMarkup(pokemon)).join('');
};
