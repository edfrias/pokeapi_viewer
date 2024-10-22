import { POKEAPI_URL } from "../constants/pokemonUrl"

export const fetchPokemonDetails = async (pokemonId) => {
  const response = await fetch(`${POKEAPI_URL}/pokemon/${pokemonId}`)
  return await response.json()
}
