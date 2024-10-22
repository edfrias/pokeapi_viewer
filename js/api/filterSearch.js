import { state } from "../constants/state";

export const filterSearch = (search) => {
  if(!search) {
    console.error('No search was provided');
  }

  let pokemons = [];

  if(!isNaN(search)) {
    pokemons = [...state.allPokemon.filter(pokemon => pokemon.entry_number === parseInt(search, 10))];
  } else {
    pokemons = [...state.allPokemon.filter(pokemon => pokemon.pokemon_species.name.toLowerCase().includes(search))];
  }

  return pokemons
};
