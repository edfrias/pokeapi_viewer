import { renderColorFilter } from "./renderColorFilter";
import { renderGenderFilter } from "./renderGenderFilter";
import { renderTypeFilter } from "./renderTypeFilter";

export const renderFilters = (filters) => {
  if(!filters) {
    console.error('Invalid filters error');
    return;
  }

  renderColorFilter(filters.colors);
  renderGenderFilter(filters.genders);
  renderTypeFilter(filters.types);
};