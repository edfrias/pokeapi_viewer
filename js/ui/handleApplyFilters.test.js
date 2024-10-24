import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPokemonFetchedData } from '../api/getPokemonFetchedData';
import { gatherSelectedFiltersData } from './gatherSelectedFiltersData';
import { renderPokemonListAndUpdateUi } from './renderPokemonListAndUpdateUi';
import { state } from '../constants/state';
import { handleApplyFilters } from './handleApplyFilters';

vi.mock('../api/getPokemonFetchedData');
vi.mock('./gatherSelectedFiltersData');
vi.mock('./renderPokemonListAndUpdateUi');

describe('handleApplyFilters', () => {
  let pokemonListNode, spinnerNode;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="pokemon-list"></div>
      <loading id="loading" class="spinner"></loading>
      <input name="gender" type="radio" value="male" checked>
      <input name="type" type="checkbox" value="fire" checked>
      <input name="type" type="checkbox" value="water">
    `;

    pokemonListNode = document.getElementById('pokemon-list');
    spinnerNode = document.getElementById('loading');

    state.selectedFilters = { gender: null, types: [] };
    state.currentOffset = 0;
    state.pokemonList = [];
    state.filteredPokemons = [];
  });

  it('should log an error if pokemonListNode or spinnerNode is missing', async () => {
    document.getElementById('pokemon-list').remove();

    const consoleErrorSpy = vi.spyOn(console, 'error');

    await handleApplyFilters();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid node error');
    consoleErrorSpy.mockRestore();
  });

  it('should update state.selectedFilters with gender and types from DOM', async () => {
    await handleApplyFilters();

    expect(state.selectedFilters.gender).toBe('male');
    expect(state.selectedFilters.types).toEqual(['fire']);
  });

  it('should call gatherSelectedFiltersData and getPokemonFetchedData with correct parameters', async () => {
    const selectedFilters = { colorsFilterData: [], genderFilterData: {}, typesFilterData: [] };
    const gatherSelectedFiltersDataMock = vi.mocked(gatherSelectedFiltersData).mockResolvedValue(selectedFilters);

    await handleApplyFilters();

    expect(gatherSelectedFiltersDataMock).toHaveBeenCalled();
    expect(getPokemonFetchedData).toHaveBeenCalledWith({
      pokemonList: state.filteredPokemons,
      offset: 0,
      limit: 1000
    });
  });

  it('should hide the spinner and call renderPokemonListAndUpdateUi after fetching data', async () => {
    await handleApplyFilters();

    expect(spinnerNode.style.display).toBe('none');
    expect(renderPokemonListAndUpdateUi).toHaveBeenCalled();
  });
});
