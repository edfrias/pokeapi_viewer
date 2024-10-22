import { describe, expect, it, vi } from 'vitest';
import { POKEAPI_URL } from '../constants/pokemonUrl';
import { getPokemonFetchedData } from './getPokemonFetchedData';
import { state } from '../constants/state';

describe('getPokemonFetchedData', () => {
  state.pokemonList = [];
  state.currentOffset = 0;
  const pokemonList = [
    {
        "entry_number": 1,
        "pokemon_species": {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon-species/1/"
        }
    },
    {
        "entry_number": 2,
        "pokemon_species": {
            "name": "ivysaur",
            "url": "https://pokeapi.co/api/v2/pokemon-species/2/"
        }
    },
    {
        "entry_number": 3,
        "pokemon_species": {
            "name": "venusaur",
            "url": "https://pokeapi.co/api/v2/pokemon-species/3/"
        }
    },
    {
        "entry_number": 4,
        "pokemon_species": {
            "name": "charmander",
            "url": "https://pokeapi.co/api/v2/pokemon-species/4/"
        }
    },
    {
        "entry_number": 5,
        "pokemon_species": {
            "name": "charmeleon",
            "url": "https://pokeapi.co/api/v2/pokemon-species/5/"
        }
    }
  ];

  it('should log error when missing parameters', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');
    await getPokemonFetchedData({ pokemonList: null, offset: null, limit: null });
    expect(consoleErrorSpy).toHaveBeenCalledWith('You need to provide proper entry data in order to fetch.');
    consoleErrorSpy.mockRestore();
  });

  it('should fetch pokemon details and update state', async () => {
    const mockPokemonDetails = {
      types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
    };

    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockPokemonDetails),
    });

    const offset = 0;
    const limit = 3;
    const result = await getPokemonFetchedData({ pokemonList, offset, limit });

    expect(global.fetch).toHaveBeenCalledTimes(3);
    expect(global.fetch).toHaveBeenCalledWith(`${POKEAPI_URL}/pokemon/1`);
    expect(global.fetch).toHaveBeenCalledWith(`${POKEAPI_URL}/pokemon/2`);
    expect(global.fetch).toHaveBeenCalledWith(`${POKEAPI_URL}/pokemon/3`);
    expect(state.pokemonList).toEqual([
      { name: 'bulbasaur', url: `${POKEAPI_URL}/pokemon/1`, id: 1, types: ['grass', 'poison'] },
      { name: 'ivysaur', url: `${POKEAPI_URL}/pokemon/2`, id: 2, types: ['grass', 'poison'] },
      { name: 'venusaur', url: `${POKEAPI_URL}/pokemon/3`, id: 3, types: ['grass', 'poison'] },
    ]);

    expect(state.currentOffset).toBe(offset + limit);
    expect(result).toEqual(state.pokemonList);
  });

  it('should handle fetch errors', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
    await getPokemonFetchedData({ pokemonList, offset: 0, limit: 3 });
    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
