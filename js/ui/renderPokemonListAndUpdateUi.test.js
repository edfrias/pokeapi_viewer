import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderPokemonListAndUpdateUi } from './renderPokemonListAndUpdateUi';
import { renderPokemonsList } from './renderPokemonsList';
import { renderPokemonCounter } from './renderPokemonCounter';
import { handleOpenModalWithAccessibilityKeys } from './handleOpenModalWithAccessibilityKeys';

vi.mock('./renderPokemonsList');
vi.mock('./renderPokemonCounter');
vi.mock('./handleOpenModalWithAccessibilityKeys');

const state = {
  pokemonList: [
    { name: 'Pikachu', id: 25 },
    { name: 'Charmander', id: 4 }
  ]
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('renderPokemonListAndUpdateUi', () => {
  let node;

  beforeEach(() => {
    node = document.createElement('div');
    node.id = 'pokemon-list';
    document.body.appendChild(node);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should log an error if pokemonListNode is not found', () => {
    document.body.innerHTML = '';

    const consoleErrorSpy = vi.spyOn(console, 'error');
    renderPokemonListAndUpdateUi();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid pokemonListNode error');
    consoleErrorSpy.mockRestore();
  });

  it('should not log an error when pokemonListNode exists', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    renderPokemonListAndUpdateUi();

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('should call renderPokemonsList, renderPokemonCounter, and handleOpenModalWithAccessibilityKeys', () => {
    renderPokemonListAndUpdateUi();

    expect(renderPokemonsList).toHaveBeenCalled({ pokemonList: state.pokemonList, node });
    expect(renderPokemonCounter).toHaveBeenCalled();
    expect(handleOpenModalWithAccessibilityKeys).toHaveBeenCalled();
  });
});
