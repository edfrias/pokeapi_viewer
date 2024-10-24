import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { getSelectedFilters } from './getSelectedFilters';
import { availableFiltersMock } from '../mocks/availableFiltersMock';
import { state } from '../constants/state';

vi.mock('../constants/state');

beforeEach(() => {
  state = {
    availableFilters: availableFiltersMock,
    selectedFilters: {
      color: [],
      gender: undefined,
      types: []
    }
  }
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('getSelectedFilters', () => {
  it('should return empty filters when nothing is selected', () => {
    const result = getSelectedFilters();

    expect(result).toEqual({
      colorsFilterData: [],
      genderFilterData: undefined,
      typesFilterData: []
    });
  });

  it('should return the selected color filters', async () => {
    state.selectedFilters.color = ['blue', 'green'];

    const result = await getSelectedFilters();

    expect(result).toEqual(
      {
        colorsFilterData: [
          { name: 'blue', url: 'https://pokeapi.co/api/v2/pokemon-color/2/' },
          { name: 'green', url: 'https://pokeapi.co/api/v2/pokemon-color/5/' }
        ],
        genderFilterData: undefined,
        typesFilterData: [],
      }
    );
  });

  it('should return the selected gender filter', () => {
    state.selectedFilters.gender = 'female';

    const result = getSelectedFilters();

    expect(result).toEqual({
      colorsFilterData: [],
      genderFilterData: {
        'name': 'female',
        'url': 'https://pokeapi.co/api/v2/gender/1/'
      },
      typesFilterData: [],
    });
  });

  it('should return the selected type filters', () => {
    state.selectedFilters.types = ['fire', 'water'];

    const result = getSelectedFilters();

    expect(result).toEqual({
      colorsFilterData: [],
      genderFilterData: undefined,
      typesFilterData: [
        { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' },
        { name: 'water', url: 'https://pokeapi.co/api/v2/type/11/' }
      ]
    });
  });

  it('should handle combinations of selected filters', () => {
    state.selectedFilters.color = ['red', 'yellow'];
    state.selectedFilters.gender = 'male';
    state.selectedFilters.types = ['normal', 'fighting'];

    const result = getSelectedFilters();

    expect(result).toEqual({
      colorsFilterData: [
        { name: 'red', url: 'https://pokeapi.co/api/v2/pokemon-color/8/' },
        { name: 'yellow', url: 'https://pokeapi.co/api/v2/pokemon-color/10/' }
      ],
      genderFilterData: { name: 'male', url: 'https://pokeapi.co/api/v2/gender/2/' },
      typesFilterData: [
        { 'name': 'normal', 'url': 'https://pokeapi.co/api/v2/type/1/' },
        { 'name': 'fighting', 'url': 'https://pokeapi.co/api/v2/type/2/' }
      ]
    });
  });
});
