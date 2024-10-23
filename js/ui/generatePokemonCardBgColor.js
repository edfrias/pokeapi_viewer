export const generatePokemonCardBgColor = (pokemon) => {
  if(!pokemon) {
    console.error('Invalid pokemon error');
    return;
  }

  if(pokemon.types.length === 1) {
    return `--typeColor:var(--type-${pokemon.types[0]}); --secondary-typeColor:var(--type-${pokemon.types[0]});`;
  }

  if(pokemon.types.length > 1) {
    return `--typeColor:var(--type-${pokemon.types[0]}); --secondary-typeColor:var(--type-${pokemon.types[1]});`;
  }
};
