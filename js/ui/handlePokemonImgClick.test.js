import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { showPokemonDetails } from './showPokemonDetails';
import { handlePokemonImgClick } from './handlePokemonImgClick';

vi.mock('./showPokemonDetails');

describe('handlePokemonImgClick', () => {
  beforeEach(() => {
    showPokemonDetails.mockClear();
  });

  it('should log an error if event is not provided', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    await handlePokemonImgClick();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid event error');
    expect(showPokemonDetails).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it('should call showPokemonDetails with the target of the event', async () => {
    const mockEvent = {
      target: document.createElement('img'),
    };

    await handlePokemonImgClick(mockEvent);

    expect(showPokemonDetails).toHaveBeenCalledWith(mockEvent.target);
  });

  it('should not log an error when a valid event is provided', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    const mockEvent = {
      target: document.createElement('img'),
    };

    await handlePokemonImgClick(mockEvent);

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
