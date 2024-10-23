import { showPokemonDetails } from "./showPokemonDetails";

export const handlePokemonImgClick = async (event) => {
  if(!event) {
    console.error('Invalid event error');
    return;
  }

  const target = event.target;
  await showPokemonDetails(target);
};