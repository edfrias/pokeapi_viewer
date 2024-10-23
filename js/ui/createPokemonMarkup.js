import { generatePokemonCardBgColor } from "./generatePokemonCardBgColor";

export const createPokemonMarkup = (pokemon) => {
  if(!pokemon) {
    console.error(`No pokemon information was provided for ${pokemon}`);
    return;
  }

  return `
    <div class="pokemon" style="${generatePokemonCardBgColor(pokemon)}" tabindex="0">
      <div class="pokemon__img-container">
          <img class="pokemon__img" data-id="${pokemon.id}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="Image for pokemon ${pokemon.name}">
      </div>
      <div class="pokemon__info">
          <span class="pokemon__info__number">#${pokemon.id.toString().padStart(4, '0')}</span>
          <h3 class="pokemon__info__name">${pokemon.name}</h3>
          <small class="pokemon__info__type">Type: <span>${pokemon.types.join(', ')}</span></small>
      </div>
    </div>
  `;
};
