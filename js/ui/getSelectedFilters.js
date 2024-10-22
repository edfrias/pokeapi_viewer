import { state } from "../constants/state";

export const getSelectedFilters = () => {
  const selectedColors = state.availableFilters.color.filter(color => state.selectedFilters.color.includes(color.name));
  const selectedGender = state.availableFilters.gender.find(gender => gender.name === state.selectedFilters.gender);
  const selectedTypes = state.availableFilters.types.filter(type => state.selectedFilters.types.includes(type.name));

  return {
    colorsFilterData: selectedColors,
    genderFilterData: selectedGender,
    typesFilterData: selectedTypes
  };
};
