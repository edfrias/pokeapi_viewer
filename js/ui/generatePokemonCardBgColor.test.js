import { describe, it, expect, vi } from 'vitest';
import { generatePokemonCardBgColor } from './generatePokemonCardBgColor';

describe('generatePokemonCardBgColor', () => {
  it('should return correct CSS variables for a single type Pokémon', () => {
    const pokemon = { types: ['grass'] };

    const result = generatePokemonCardBgColor(pokemon);

    const expected = '--typeColor:var(--type-grass); --secondary-typeColor:var(--type-grass);';

    expect(result).toBe(expected);
  });

  it('should return correct CSS variables for a dual-type Pokémon', () => {
    const pokemon = { types: ['fire', 'flying'] };

    const result = generatePokemonCardBgColor(pokemon);

    const expected = '--typeColor:var(--type-fire); --secondary-typeColor:var(--type-flying);';

    expect(result).toBe(expected);
  });

  it('should log an error if the pokemon is null or invalid', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    generatePokemonCardBgColor(null);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid pokemon error');

    consoleErrorSpy.mockRestore();
  });

  it('should return undefined if pokemon is null or invalid', () => {
    const result = generatePokemonCardBgColor(null);

    expect(result).toBeUndefined();
  });
});
