import { describe, expect, it, vi } from 'vitest';
import { POKEAPI_URL } from '../constants/pokemonUrl.js';
import { fetchPokemonDetails } from './fetchPokemonDetails.js'

describe('fetchPokemonDetails', () => {
  it('should fetch and return pokemon details', async () => {
    const mockPokemonDetails = {
      id: 1,
      name: 'bulbasaur',
      types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
    };

    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockPokemonDetails),
    });

    const pokemonId = 1;

    const result = await fetchPokemonDetails(pokemonId);

    expect(global.fetch).toHaveBeenCalledOnce();
    expect(global.fetch).toHaveBeenCalledWith(`${POKEAPI_URL}/pokemon/${pokemonId}`);

    expect(result).toEqual(mockPokemonDetails);
  });
});
