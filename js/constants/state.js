export const state = {
  pokemonList: [],
  filteredPokemons: [],
  allPokemon: [],
  currentOffset: 0,
  limit: 20,
  selectedFilters: {
    color: [],
    gender: '',
    types: []
  },
  availableFilters: {
    color: [],
    gender: [],
    types: []
  },
  searchTerm: '',
  totalPokemon: 0
};
