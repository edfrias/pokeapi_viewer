import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderPokemonCounter } from './renderPokemonCounter';
import { state } from '../constants/state';

vi.mock('../constants/state');

describe('renderPokemonCounter', () => {
  let pokemonCounter;

  beforeEach(() => {
    pokemonCounter = document.createElement('div');
    pokemonCounter.classList.add('pokemon-count');
    document.body.appendChild(pokemonCounter);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should log an error if pokemonCounter is not found', () => {
    document.body.innerHTML = '';

    const consoleErrorSpy = vi.spyOn(console, 'error');

    renderPokemonCounter();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid pokemonCounter error');
    consoleErrorSpy.mockRestore();
  });

  it('should update pokemonCounter with the correct number of Pokémon', () => {
    state.pokemonList = [
      { name: 'Bulbasaur', id: 1 },
      { name: 'Charmander', id: 4 },
      { name: 'Squirtle', id: 7 }
    ];

    renderPokemonCounter();
    const expectedHTML = `<span class="pokemon-count__pokemon__number">${state.pokemonList.length}</span> Pokémon displayed`;
    expect(pokemonCounter.innerHTML.replace(/\s+/g, ' ').trim()).toBe(expectedHTML.replace(/\s+/g, ' ').trim());
  });

  it('should not log an error when pokemonCounter exists', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    renderPokemonCounter();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('should display 0 Pokémon when pokemonList is empty', () => {
    state.pokemonList = [];
    renderPokemonCounter();
    const expectedHTML = `<span class="pokemon-count__pokemon__number">0</span> Pokémon displayed`;
    expect(pokemonCounter.innerHTML.replace(/\s+/g, ' ').trim()).toBe(expectedHTML.replace(/\s+/g, ' ').trim());
  });
});