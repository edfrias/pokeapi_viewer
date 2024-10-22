import { showPokemonDetails } from "./showPokemonDetails";

export const handlePokemonImgClick = async (event) => {
  const target = event.target;
  await showPokemonDetails(target);
};