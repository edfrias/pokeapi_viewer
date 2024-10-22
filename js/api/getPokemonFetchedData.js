import { POKEAPI_URL } from "../constants/pokemonUrl";
import { state } from "../constants/state";

export const getPokemonFetchedData = async ({ pokemonList, offset, limit}) => {
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
};
