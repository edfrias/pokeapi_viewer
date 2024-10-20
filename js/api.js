import { state } from './state';

const POKEAPI_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonNationalData() {
  const nationalUrl = `${POKEAPI_URL}/pokedex/national`;
  const response = await fetch(nationalUrl);

  if(!response.ok) {
    return Promise.reject({ error: `Something went wrong while retrieving Pokemons at ${nationalUrl}` });
  }

  const nationalPokemonList = await response.json();
  state.allPokemon = nationalPokemonList.pokemon_entries;
  state.totalPokemon = nationalPokemonList.pokemon_entries.length;

  return nationalPokemonList;
}

export async function getPokemonFetchedData({ pokemonList, offset, limit}) {
  const initialLoad =  pokemonList.slice(offset, offset + limit);
  state.currentOffset = offset + limit;

  return await Promise.all(initialLoad.map(async entry => {
    const detailsResponse = await fetch(`${POKEAPI_URL}/pokemon/${entry.entry_number}`);
    const details = await detailsResponse.json();

    const pokemonData = {
      name: entry.pokemon_species.name,
      url: `${POKEAPI_URL}/pokemon/${entry.entry_number}`,
      id: entry.entry_number,
      types: details.types.map(t => t.type.name)
    }

    state.pokemonList = [...state.pokemonList, pokemonData];

    return pokemonData;
  })).catch((error) => console.error(error));
}

export async function fetchPokemonDetails(pokemonId) {
  const response = await fetch(`${POKEAPI_URL}/pokemon/${pokemonId}`)
  return await response.json()
}
