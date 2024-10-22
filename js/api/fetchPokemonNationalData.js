import { POKEAPI_URL } from "../constants/pokemonUrl";
import { state } from "../constants/state";

export const fetchPokemonNationalData = async () => {
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
