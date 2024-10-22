import { describe, expect, it, vi } from 'vitest';
import { filterSearch } from './filterSearch';
import { state } from '../constants/state';
describe('filterSearch', () => {
  it('should log error when search is not provided', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');
    filterSearch('');

    expect(consoleErrorSpy).toHaveBeenCalledWith('No search was provided');
    consoleErrorSpy.mockRestore();
  });

  it('should return Pokémon by entry number when search is a number', () => {
    state.allPokemon = [
      { entry_number: 1, pokemon_species: { name: 'bulbasaur' } },
      { entry_number: 2, pokemon_species: { name: 'ivysaur' } },
    ];

    const result = filterSearch('1');

    expect(result).toEqual([{ entry_number: 1, pokemon_species: { name: 'bulbasaur' } }]);
  });

  it('should return Pokémon by name when search is a string', () => {
    state.allPokemon = [
      { entry_number: 1, pokemon_species: { name: 'bulbasaur' } },
      { entry_number: 2, pokemon_species: { name: 'ivysaur' } },
    ];

    const result = filterSearch('bulba');
    expect(result).toEqual([{ entry_number: 1, pokemon_species: { name: 'bulbasaur' } }]);
  });

  it('should return an empty array when no Pokémon matches', () => {
    state.allPokemon = [
      { entry_number: 1, pokemon_species: { name: 'bulbasaur' } },
      { entry_number: 2, pokemon_species: { name: 'ivysaur' } },
    ];

    const result = filterSearch('charmander');

    expect(result).toEqual([]);
  });
});
