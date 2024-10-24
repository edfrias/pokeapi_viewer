import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPokemonFetchedData } from '../api/getPokemonFetchedData';
import { state } from '../constants/state';
import { handleResetFilters } from './handleResetFilters';

vi.mock('../constants/state');
vi.mock('../api/getPokemonFetchedData');

describe('handleResetFilters', () => {
  let pokemonListNode, searchInput;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="pokemon-list"></div>
      <input id="search-input" value="pikachu" />
      <div class="color-box selected" data-color="red"></div>
      <input name="gender" type="radio" value="male" checked>
      <input name="type" type="checkbox" value="fire" checked>
      <input name="type" type="checkbox" value="water">
    `;

    pokemonListNode = document.getElementById('pokemon-list');
    searchInput = document.getElementById('search-input');

    state.selectedFilters = {
      color: ['red'],
      gender: 'male',
      types: ['fire']
    };
    state.searchTerm = 'pikachu';
    state.currentOffset = 10;
    state.pokemonList = ['pokemon1', 'pokemon2'];
    state.allPokemon = ['pokemon1', 'pokemon2', 'pokemon3', 'pokemon4'];
  });

  it('should log an error if pokemonListNode is missing', async () => {
    document.getElementById('pokemon-list').remove();

    const consoleErrorSpy = vi.spyOn(console, 'error');

    await handleResetFilters();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid node error');
    consoleErrorSpy.mockRestore();
  });

  it('should fetch initial Pokémon batch and update state.pokemonList', async () => {
    const fetchedPokemons = ['pokemon1', 'pokemon2'];
    vi.mocked(getPokemonFetchedData).mockResolvedValue(fetchedPokemons);

    await handleResetFilters();

    expect(getPokemonFetchedData).toHaveBeenCalledWith({
      pokemonList: state.allPokemon,
      offset: 0,
      limit: 20
    });
    expect(state.pokemonList).toEqual(fetchedPokemons);
  });
});
