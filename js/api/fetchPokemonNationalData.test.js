import { describe, expect, it, vi } from 'vitest';
import { POKEAPI_URL } from '../constants/pokemonUrl';
import { state } from '../constants/state';
import { fetchPokemonNationalData } from './fetchPokemonNationalData';

describe('fetchPokemonNationalData', () => {
  it('should handle fetch errors', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    await expect(fetchPokemonNationalData()).rejects.toEqual({
      error: `Something went wrong while retrieving Pokemons at ${POKEAPI_URL}/pokedex/national`,
    });

    expect(state.allPokemon).toEqual([]);
    expect(state.totalPokemon).toBe(0);
  });

  it('should fetch and store national pokedex data', async () => {
    const mockNationalPokedex = {
      pokemon_entries: [
        { entry_number: 1, pokemon_species: { name: 'bulbasaur' } },
        { entry_number: 2, pokemon_species: { name: 'ivysaur' } }
      ],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockNationalPokedex),
    });

    const result = await fetchPokemonNationalData();

    expect(global.fetch).toHaveBeenCalledOnce();
    expect(global.fetch).toHaveBeenCalledWith(`${POKEAPI_URL}/pokedex/national`);

    expect(state.allPokemon).toEqual(mockNationalPokedex.pokemon_entries);
    expect(state.totalPokemon).toBe(mockNationalPokedex.pokemon_entries.length);

    expect(result).toEqual(mockNationalPokedex);
  });
});
