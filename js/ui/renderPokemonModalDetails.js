export const renderPokemonModalDetails = (pokemon) => {
  const pokemonDetails = document.getElementById('pokemon-details');

  pokemonDetails.innerHTML = `
    <h2>${pokemon.name} #${pokemon.id.toString().padStart(4, '0')}</h2>
    <img width="475" height="475" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" class="pokemon-image">
    <div>
    <p>Height: ${pokemon.height / 10}m</p>
    <p>Weight: ${pokemon.weight / 10}kg</p>
    <p>Types: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
    <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
    </div>
  `;
};
