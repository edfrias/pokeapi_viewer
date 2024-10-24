import { describe, it, expect, vi, beforeEach } from 'vitest';
import { state } from '../constants/state';
import { gatherSelectedFiltersData } from './gatherSelectedFiltersData';

global.fetch = vi.fn();

describe('gatherSelectedFiltersData', () => {
  beforeEach(() => {
    state.allPokemon = [
      { pokemon_species: { name: 'bulbasaur' }, otherData: 'test1' },
      { pokemon_species: { name: 'charmander' }, otherData: 'test2' },
      { pokemon_species: { name: 'squirtle' }, otherData: 'test3' },
    ];
    state.filteredPokemons = [];
    fetch.mockClear();
  });

  it('should log an error if no selectedFiltersData is provided', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    await gatherSelectedFiltersData();

    expect(consoleErrorSpy).toHaveBeenCalledWith('There is no filter data provided.');
    consoleErrorSpy.mockRestore();
  });

  it('should call fetch for each color, gender, and type URL', async () => {
    const selectedFiltersData = {
      colorsFilterData: [
        { url: 'https://pokeapi.co/api/v2/color/1/' },
        { url: 'https://pokeapi.co/api/v2/color/2/' },
      ],
      genderFilterData: { url: 'https://pokeapi.co/api/v2/gender/1/' },
      typesFilterData: [
        { url: 'https://pokeapi.co/api/v2/type/1/' },
        { url: 'https://pokeapi.co/api/v2/type/2/' },
      ],
    };

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ pokemon_species: [{ name: 'bulbasaur' }] }),
    });
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ pokemon_species: [{ name: 'charmander' }] }),
    });
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ pokemon_species_details: [{ pokemon_species: { name: 'squirtle' } }] }),
    });
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ pokemon: [{ pokemon: { name: 'bulbasaur' } }] }),
    });
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ pokemon: [{ pokemon: { name: 'charmander' } }] }),
    });

    await gatherSelectedFiltersData(selectedFiltersData);

    expect(fetch).toHaveBeenCalledTimes(5);
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/color/1/');
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/color/2/');
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/gender/1/');
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/type/1/');
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/type/2/');
  });

  it('should update state.filteredPokemons with unique filtered Pokémon', async () => {
    const selectedFiltersData = {
      colorsFilterData: [{ url: 'https://pokeapi.co/api/v2/color/1/' }],
      genderFilterData: { url: 'https://pokeapi.co/api/v2/gender/1/' },
      typesFilterData: [{ url: 'https://pokeapi.co/api/v2/type/1/' }],
    };

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ pokemon_species: [{ name: 'bulbasaur' }] }),
    });
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ pokemon_species_details: [{ pokemon_species: { name: 'charmander' } }] }),
    });
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ pokemon: [{ pokemon: { name: 'squirtle' } }] }),
    });

    await gatherSelectedFiltersData(selectedFiltersData);

    expect(state.filteredPokemons).toEqual([
      { pokemon_species: { name: 'bulbasaur' }, otherData: 'test1' },
      { pokemon_species: { name: 'charmander' }, otherData: 'test2' },
      { pokemon_species: { name: 'squirtle' }, otherData: 'test3' },
    ]);
  });

  it('should not add Pokémon to filteredPokemons if they are not found in state.allPokemon', async () => {
    const selectedFiltersData = {
      colorsFilterData: [{ url: 'https://pokeapi.co/api/v2/color/1/' }],
      genderFilterData: { url: 'https://pokeapi.co/api/v2/gender/1/' },
      typesFilterData: [{ url: 'https://pokeapi.co/api/v2/type/1/' }],
    };

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ pokemon_species: [{ name: 'pikachu' }] }),
    });
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ pokemon_species_details: [{ pokemon_species: { name: 'eevee' } }] }),
    });
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ pokemon: [{ pokemon: { name: 'jigglypuff' } }] }),
    });

    await gatherSelectedFiltersData(selectedFiltersData);

    expect(state.filteredPokemons).toEqual([]);
  });
});
