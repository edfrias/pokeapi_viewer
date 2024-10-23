import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loadNextPokemonBatch } from './loadNextPokemonBatch';
import { state } from '../constants/state';
import { allPokemonDataMock } from '../mocks/allPokemonDataMock';
import { pokemonListMock } from '../mocks/pokemonListMock';
import { getPokemonFetchedData } from './getPokemonFetchedData';

document.body.innerHTML = '<button id="load-more">Load More</button>';
vi.mock('./getPokemonFetchedData');

describe('loadNextPokemonBatch', () => {
  beforeEach(() => {
    state.pokemonList = [];
    state.allPokemon = [];
    state.currentOffset = 0;
    state.totalPokemon = 40;
    state.limit = 20;

    document.getElementById('load-more').style.display = 'block';

    vi.resetModules();
  });

  it('should hide load more button when currentOffset >= totalPokemon', async () => {
    state.currentOffset = 40;
    await loadNextPokemonBatch();
    expect(document.getElementById('load-more').style.display).toBe('none');
  });

  it('should call getPokemonFetchedData with correct parameters', async () => {
    vi.mocked(getPokemonFetchedData).mockResolvedValue(pokemonListMock.slice(0, 40));

    state.currentOffset = 0;
    state.allPokemon = allPokemonDataMock.slice(0, 40);

    await loadNextPokemonBatch();

    expect(await getPokemonFetchedData).toHaveBeenCalled();
    expect(await getPokemonFetchedData).toHaveBeenCalledWith({
      pokemonList: state.allPokemon,
      offset: 0,
      limit: 20
    });
  });

  it('should update currentOffset after loading batch', async () => {
    state.allPokemon = allPokemonDataMock.slice(0, 40);

    vi.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(pokemonListMock.slice(0, 60))
      })
    );

    await loadNextPokemonBatch();
    expect(state.currentOffset).toBe(state.pokemonList.length);
  });

  it('should show load more button when there are more Pokemon to load', async () => {
    state.currentOffset = 20;
    state.totalPokemon = 40;

    await loadNextPokemonBatch();

    expect(document.getElementById('load-more').style.display).toBe('block');
  });
});
