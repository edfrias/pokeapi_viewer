import { state } from "../constants/state";

export const gatherSelectedFiltersData = async (selectedFiltersData) => {
  if(!selectedFiltersData) {
    console.error('There is no filter data provided.');

    return;
  }

  const filterPromises = [];

  selectedFiltersData.colorsFilterData?.forEach(color => filterPromises.push(fetch(color.url).then(res => res.json())));
  selectedFiltersData.genderFilterData && filterPromises.push(fetch(selectedFiltersData.genderFilterData?.url).then(res => res.json()));
  selectedFiltersData.typesFilterData?.forEach(type => filterPromises.push(fetch(type.url).then(res => res.json())));

  const filtersResult = await Promise.all(filterPromises);

  filtersResult.forEach(filter => {
    // Color filter data
    if(filter.pokemon_species?.length) {
      console.log('color');
      filter.pokemon_species.forEach(filteredPokemon => {
        const nationalPokemonFiltered = state.allPokemon.find(nationalPokemon => nationalPokemon.pokemon_species.name === filteredPokemon.name);

        if(nationalPokemonFiltered) {
          state.filteredPokemons = Array.from(new Set([...state.filteredPokemons, nationalPokemonFiltered]));
        }
      })
    }

    // Gender filter data
    if(filter.pokemon_species_details?.length) {
      console.log('gender');
      filter.pokemon_species_details.forEach(filteredPokemon => {
        const nationalPokemonFiltered = state.allPokemon.find(nationalPokemon => nationalPokemon.pokemon_species.name === filteredPokemon.pokemon_species.name);

        if(nationalPokemonFiltered) {
          state.filteredPokemons = Array.from(new Set([...state.filteredPokemons, nationalPokemonFiltered]));
        }
      })
    }

    // Types filter data
    if(filter.pokemon?.length) {
      console.log('types');
      filter.pokemon.forEach(filteredPokemon => {
        const nationalPokemonFiltered = state.allPokemon.find(nationalPokemon => nationalPokemon.pokemon_species.name === filteredPokemon.pokemon.name);

        if(nationalPokemonFiltered) {
          state.filteredPokemons = Array.from(new Set([...state.filteredPokemons, nationalPokemonFiltered]));
        }
      })
    }
  });

  console.log(state)
};
