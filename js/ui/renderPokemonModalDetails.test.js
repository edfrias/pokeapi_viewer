import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderPokemonModalDetails } from './renderPokemonModalDetails';

describe('renderPokemonModalDetails', () => {
  let pokemonDetailsElement;

  beforeEach(() => {
    pokemonDetailsElement = document.createElement('div');
    pokemonDetailsElement.id = 'pokemon-details';
    document.body.appendChild(pokemonDetailsElement);
  });

  afterEach(() => {
    document.body.removeChild(pokemonDetailsElement);
    vi.restoreAllMocks();
  });

  it('should log an error and return early if no Pokémon is provided', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    await renderPokemonModalDetails(null);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid pokemon provided');
    expect(pokemonDetailsElement.innerHTML).toBe('');

    consoleErrorSpy.mockRestore();
  });

  it('should render the correct Pokémon details when a valid Pokémon is provided', async () => {
    const mockPokemon = {
      id: 25,
      name: 'pikachu',
      height: 4,
      weight: 60,
      types: [
        { type: { name: 'electric' } }
      ],
      abilities: [
        { ability: { name: 'static' } },
        { ability: { name: 'lightning-rod' } }
      ],
      sprites: {
        other: {
          'official-artwork': {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
          }
        }
      }
    };

    await renderPokemonModalDetails(mockPokemon);

    const expectedHTML = `
      <h2>pikachu #0025</h2>
      <img width="475" height="475" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="pikachu" class="pokemon-image">
      <div>
        <p>Height: 0.4m</p>
        <p>Weight: 6kg</p>
        <p>Types: electric</p>
        <p>Abilities: static, lightning-rod</p>
      </div>
    `;

    expect(pokemonDetailsElement.innerHTML.replace(/\s+/g, ' ').trim()).toBe(expectedHTML.replace(/\s+/g, ' ').trim());
  });
});
