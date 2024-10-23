import { describe, it, expect, vi, afterAll } from 'vitest';
import { createPokemonMarkup } from './createPokemonMarkup.js';
import { generatePokemonCardBgColor } from './generatePokemonCardBgColor';

vi.mock('./generatePokemonCardBgColor');

describe('createPokemonMarkup', () => {
  const consoleErrorSpy = vi.spyOn(console, 'error');

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should log an error if no Pokémon data is provided', () => {
    createPokemonMarkup(null);
    expect(consoleErrorSpy).toHaveBeenCalledWith('No pokemon information was provided for null');
  });

  it.skip('should return correct HTML markup for a valid Pokémon', () => {
    const pokemon = {
      id: 1,
      name: 'bulbasaur',
      types: ['grass', 'poison']
    };

    vi.mocked(generatePokemonCardBgColor).mockResolvedValue('--typeColor:var(--type-grass); --secondary-typeColor:var(--type-poison);');

    const expectedMarkup = `
    <div class="pokemon" style="--typeColor:var(--type-grass); --secondary-typeColor:var(--type-poison);" tabindex="0">
      <div class="pokemon__img-container">
          <img class="pokemon__img" data-id="1" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="Image for pokemon ${pokemon.name}">
      </div>
      <div class="pokemon__info">
          <span class="pokemon__info__number">#0001</span>
          <h3 class="pokemon__info__name">bulbasaur</h3>
          <small class="pokemon__info__type">Type: <span>grass, poison</span></small>
      </div>
    </div>
  `;

    const result = createPokemonMarkup(pokemon);
    expect(result.replace(/\s+/g, ' ').trim()).toBe(expectedMarkup.replace(/\s+/g, ' ').trim());
  });


});
