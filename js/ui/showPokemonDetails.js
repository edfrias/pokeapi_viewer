import { fetchPokemonDetails } from "../api/fetchPokemonDetails";

import { closeModal } from "./closeModal";
import { handleEscKey } from "./handleEscKey";
import { renderPokemonModalDetails } from "./renderPokemonModalDetails";

export const showPokemonDetails = async (node) => {
  if(!node|| !(node instanceof Element)) {
    console.error('Invalid node error');
    return;
  }

  if (node.classList.contains('pokemon__img')) {
    const pokemonId = node.dataset.id;
    const details = await fetchPokemonDetails(pokemonId);
    const modal = document.getElementById('modal');

    renderPokemonModalDetails(details);
    modal.style.display = 'block';
    modal.querySelector('.close').addEventListener('click', closeModal);
    document.addEventListener('keydown', handleEscKey);
  }
};
