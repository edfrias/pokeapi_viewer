import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { handleSearch } from './handleSearch';
import { filterSearch } from '../api/filterSearch';
import { getPokemonFetchedData } from '../api/getPokemonFetchedData';
import { renderPokemonListAndUpdateUi } from './renderPokemonListAndUpdateUi';
import { state } from '../constants/state';

vi.mock('../constants/state');
vi.mock('../api/filterSearch');
vi.mock('../api/getPokemonFetchedData');
vi.mock('./renderPokemonListAndUpdateUi');

describe('handleSearch', () => {
  let pokemonListNode;

  beforeEach(() => {
    pokemonListNode = document.createElement('div');
    pokemonListNode.id = 'pokemon-list';
    document.body.appendChild(pokemonListNode);

    state.currentOffset = 0;
    state.pokemonList = [];
    state.filteredPokemons = [];
    state.searchTerm = '';

    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should log an error if no event is provided', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    await handleSearch();

    expect(consoleErrorSpy).toHaveBeenCalledWith('No criteria was provided');
    consoleErrorSpy.mockRestore();
  });

  it('should log an error if pokemonListNode is not found', async () => {
    document.body.innerHTML = '';
    const event = { target: { value: 'pikachu' } };
    const consoleErrorSpy = vi.spyOn(console, 'error');

    await handleSearch(event);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid pokemonListNode error');
    consoleErrorSpy.mockRestore();
  });

  it('should log an error if searchTerm is empty', async () => {
    const event = { target: { value: '' } };
    const consoleErrorSpy = vi.spyOn(console, 'error');

    await handleSearch(event);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid searchTerm error');
    consoleErrorSpy.mockRestore();
  });

  it('should log an error if filterSearch returns null', async () => {
    const event = { target: { value: 'pikachu' } };
    filterSearch.mockReturnValue(null); // Mock filterSearch to return null
    const consoleErrorSpy = vi.spyOn(console, 'error');

    await handleSearch(event);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid pokemonsToSearch error');
    consoleErrorSpy.mockRestore();
  });

  it('should update state and call getPokemonFetchedData and renderPokemonListAndUpdateUi for valid search', async () => {
    const event = { target: { value: 'pikachu' } };
    const mockPokemonList = [{ name: 'Pikachu', id: 25 }];

    filterSearch.mockReturnValue(mockPokemonList);
    getPokemonFetchedData.mockResolvedValue();

    await handleSearch(event);

    expect(state.currentOffset).toBe(0);
    expect(state.searchTerm).toBe('pikachu');
    expect(state.filteredPokemons).toEqual(mockPokemonList);
    expect(getPokemonFetchedData).toHaveBeenCalledWith({ pokemonList: mockPokemonList, offset: 0, limit: 1000 });
    expect(renderPokemonListAndUpdateUi).toHaveBeenCalled();
  });
});
