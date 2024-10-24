import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { showPokemonDetails } from './showPokemonDetails';
import { fetchPokemonDetails } from '../api/fetchPokemonDetails';
import { renderPokemonModalDetails } from './renderPokemonModalDetails';
import { closeModal } from './closeModal';
import { handleEscKey } from './handleEscKey';

vi.mock('../api/fetchPokemonDetails');
vi.mock('./renderPokemonModalDetails');
vi.mock('./closeModal');
vi.mock('./handleEscKey');

beforeEach(() => {
  vi.clearAllMocks();
});

describe('showPokemonDetails', () => {
  let modal;

  beforeEach(() => {
    modal = document.createElement('div');
    modal.id = 'modal';
    modal.style.display = 'none';

    const closeButton = document.createElement('button');
    closeButton.classList.add('close');
    modal.appendChild(closeButton);
    document.body.appendChild(modal);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should log an error if node is invalid', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    await showPokemonDetails(null);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid node error');
    consoleErrorSpy.mockRestore();
  });

  it('should log an error if node is not an Element', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    await showPokemonDetails({});

    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid node error');
    consoleErrorSpy.mockRestore();
  });

  it('should not do anything if node is valid but does not have pokemon__img class', async () => {
    const node = document.createElement('div');
    node.dataset.id = '1';

    await showPokemonDetails(node);

    expect(fetchPokemonDetails).not.toHaveBeenCalled();
    expect(renderPokemonModalDetails).not.toHaveBeenCalled();
  });

  it('should show pokemon details if node is valid and has pokemon__img class', async () => {
    const pokemonDetails = { name: 'Pikachu', id: 25 };
    fetchPokemonDetails.mockResolvedValue(pokemonDetails);

    const node = document.createElement('img');
    node.classList.add('pokemon__img');
    node.dataset.id = '25';

    await showPokemonDetails(node);

    expect(fetchPokemonDetails).toHaveBeenCalledWith('25');
    expect(renderPokemonModalDetails).toHaveBeenCalledWith(pokemonDetails);
    expect(modal.style.display).toBe('block');
  });

  it('should attach event listeners for modal close and ESC key handling', async () => {
    const pokemonDetails = { name: 'Charmander', id: 4 };
    fetchPokemonDetails.mockResolvedValue(pokemonDetails);

    const node = document.createElement('img');
    node.classList.add('pokemon__img');
    node.dataset.id = '4';

    await showPokemonDetails(node);

    const closeButton = modal.querySelector('.close');
    closeButton?.click();

    expect(closeModal).toHaveBeenCalled();
    const keydownEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(keydownEvent);

    expect(handleEscKey).toHaveBeenCalled();
  });
});
