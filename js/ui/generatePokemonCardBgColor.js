export const generatePokemonCardBgColor = (pokemon) => {
  if(pokemon) {
    if(pokemon.types.length === 1) {
      return `--typeColor:var(--type-${pokemon.types[0]}); --secondary-typeColor:var(--type-${pokemon.types[0]});`;
    }

    if(pokemon.types.length > 1) {
      return `--typeColor:var(--type-${pokemon.types[0]}); --secondary-typeColor:var(--type-${pokemon.types[1]});`;
    }
  }
};
