import { state } from './state';

const POKEAPI_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList() {
  const nationalUrl = `${POKEAPI_URL}/pokedex/national`;
  const response = await fetch(nationalUrl);

  if(!response.ok) {
    return Promise.reject({ error: `Something went wrong while retrieving Pokemons at ${nationalUrl}` });
  }

  return await response.json();
}

export async function getPokemonFetchedData({ pokemonList, offset = state.currentOffset, limit = state.limit}) {
  const initialLoad =  pokemonList.pokemon_entries.slice(offset, offset + limit);
  state.currentOffset = offset + limit;

  return Promise.all(initialLoad.map(async entry => {
    const detailsResponse = await fetch(`${POKEAPI_URL}/pokemon/${entry.entry_number}`)
    const details = await detailsResponse.json()

    return {
      name: entry.pokemon_species.name,
      url: `${POKEAPI_URL}/pokemon/${entry.entry_number}`,
      id: entry.entry_number,
      types: details.types.map(t => t.type.name)
    }
  })).catch((error) => console.error(error))
}
