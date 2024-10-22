import { state } from "../constants/state";

export const resetFilters = async () => {
  state.selectedFilters = {
    color: [],
    gender: '',
    types: []
  };

  state.searchTerm = '';
  state.currentOffset = 0;
  state.pokemonList = [];

  document.getElementById('search-input').value = '';
  document.querySelectorAll('.color-box').forEach(box => {
    box.classList.remove('selected');
    box.innerHTML = '';
  });
  document.querySelector('input[name="gender"][value=""]').checked = true;
  document.querySelectorAll('input[name="type"]').forEach(filter => filter.checked = false);
};