import { POKEAPI_URL } from "../constants/pokemonUrl";
import { state } from "../constants/state";

export const fetchFilterOptions = async () => {
  const [colors, genders, types] = await Promise.all([
    fetch(`${POKEAPI_URL}/pokemon-color`).then(res => res.json()),
    fetch(`${POKEAPI_URL}/gender`).then(res => res.json()),
    fetch(`${POKEAPI_URL}/type`).then(res => res.json())
  ]);

  state.availableFilters.color = [...colors.results];
  state.availableFilters.gender = [...genders.results];
  state.availableFilters.types = [...types.results];

  return {
    colors: colors.results,
    genders: genders.results,
    types: types.results
  };
};
