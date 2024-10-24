import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { handleOpenModalWithAccessibilityKeys } from "./handleOpenModalWithAccessibilityKeys";
import { showPokemonDetails } from "./showPokemonDetails";

vi.mock('./showPokemonDetails');

describe('handleOpenModalWithAccessibilityKeys', () => {
  let pokemonNode, pokemonImg;

  beforeEach(() => {
    pokemonNode = document.createElement('div');
    pokemonNode.classList.add('pokemon');
    pokemonImg = document.createElement('img');
    pokemonImg.classList.add('pokemon__img');
    pokemonNode.appendChild(pokemonImg);
    document.body.appendChild(pokemonNode);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  it('should attach keydown event listeners to .pokemon nodes', () => {
    const addEventListenerSpy = vi.spyOn(pokemonNode, 'addEventListener');

    handleOpenModalWithAccessibilityKeys();

    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    addEventListenerSpy.mockRestore();
  });

  it('should call showPokemonDetails on Enter key press', () => {
    handleOpenModalWithAccessibilityKeys();

    const event = new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13 });
    pokemonNode.dispatchEvent(event);

    expect(showPokemonDetails).toHaveBeenCalledWith(pokemonImg);
  });

  it('should call showPokemonDetails on Space key press', () => {
    handleOpenModalWithAccessibilityKeys();

    const event = new KeyboardEvent('keydown', { key: ' ', keyCode: 32 });
    pokemonNode.dispatchEvent(event);

    expect(showPokemonDetails).toHaveBeenCalledWith(pokemonImg);
  });

  it('should prevent default behavior on Enter or Space key press', () => {
    handleOpenModalWithAccessibilityKeys();

    const event = new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13 });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    pokemonNode.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should not call showPokemonDetails if pokemon__img is not found', () => {
    pokemonNode.removeChild(pokemonImg);

    handleOpenModalWithAccessibilityKeys();

    const event = new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13 });
    pokemonNode.dispatchEvent(event);

    expect(showPokemonDetails).not.toHaveBeenCalled();
  });
});
