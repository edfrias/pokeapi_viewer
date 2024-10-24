import { describe, vi, expect, afterEach, beforeEach, it } from 'vitest';
import { createPokemonMarkup } from './createPokemonMarkup';
import { renderPokemonsList } from './renderPokemonsList';
import { pokemonListMock } from '../mocks/pokemonListMock';

vi.mock('./createPokemonMarkup');

describe('renderPokemonsList', () => {
  let node;

  beforeEach(() => {
    node = document.createElement('div');
    document.body.appendChild(node);
    node.innerHTML = '';
    node.classList = [];
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  })

  it('should show an error and return early if no pokemon list is provided', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    renderPokemonsList({ pokemonList: pokemonListMock, node: undefined });
    expect(consoleErrorSpy).toHaveBeenCalledWith('Node was not provided or is invalid.');
    expect(node.innerHTML).toBe('');
    consoleErrorSpy.mockRestore();
  });

  it('should add no-results class and show no results message if pokemonList is empty', () => {
    renderPokemonsList({ pokemonList: [], node });

    expect(node.classList.contains('no-results')).toBe(true);
    expect(node.innerHTML).toBe('<p class="no-results__text">No Pokémon found. Try different filters, search terms or reset filters.</p>');
  });

  it('should render the list of pokemons and remove the no-results class', () => {
    const pokemonList = [
      { name: 'Pikachu', id: 25 },
      { name: 'Charmander', id: 4 }
    ];

    createPokemonMarkup.mockImplementation((pokemon) => `<div class="pokemon">${pokemon.name}</div>`);

    renderPokemonsList({ pokemonList, node });

    expect(node.classList.contains('no-results')).toBe(false);
    expect(node.innerHTML).toBe(
      '<div class="pokemon">Pikachu</div><div class="pokemon">Charmander</div>'
    );
    expect(createPokemonMarkup).toHaveBeenCalledTimes(2);
    expect(createPokemonMarkup).toHaveBeenCalledWith({ name: 'Pikachu', id: 25 });
    expect(createPokemonMarkup).toHaveBeenCalledWith({ name: 'Charmander', id: 4 });
  });
});
