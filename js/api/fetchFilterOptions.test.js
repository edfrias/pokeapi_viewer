import { describe, it, expect, vi } from 'vitest';
import { POKEAPI_URL } from '../constants/pokemonUrl';
import { state } from '../constants/state';
import { fetchFilterOptions } from './fetchFilterOptions';

describe('fetchFilterOptions', () => {
  it('should fetch and store filter options', async () => {
    const mockColors = { results: [{ name: 'red' }, { name: 'blue' }] };
    const mockGenders = { results: [{ name: 'male' }, { name: 'female' }] };
    const mockTypes = { results: [{ name: 'fire' }, { name: 'water' }] };

    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValue(mockColors),
      })
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValue(mockGenders),
      })
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValue(mockTypes),
      });

    const result = await fetchFilterOptions();

    expect(global.fetch).toHaveBeenCalledTimes(3);

    expect(global.fetch).toHaveBeenCalledWith(`${POKEAPI_URL}/pokemon-color`);
    expect(global.fetch).toHaveBeenCalledWith(`${POKEAPI_URL}/gender`);
    expect(global.fetch).toHaveBeenCalledWith(`${POKEAPI_URL}/type`);

    expect(state.availableFilters.color).toEqual(mockColors.results);
    expect(state.availableFilters.gender).toEqual(mockGenders.results);
    expect(state.availableFilters.types).toEqual(mockTypes.results);

    expect(result).toEqual({
      colors: mockColors.results,
      genders: mockGenders.results,
      types: mockTypes.results,
    });
  });
});
