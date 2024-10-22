import { showPokemonDetails } from "./showPokemonDetails";

export const handleOpenModalWithAccessibilityKeys = () => {
  const pokemonNodes = document.querySelectorAll(".pokemon");

  pokemonNodes.forEach(node =>
    node.addEventListener('keydown', function(event) {
      if ((event.key === 'Enter' || event.keyCode === 13) ||
      (event.key === ' ' || event.keyCode === 32)) {
        event.preventDefault();
        const target = event.target.getElementsByClassName('pokemon__img')[0];

        if(target) {
          showPokemonDetails(target);
        }
      }
    })
  )
};
