import { renderColorFilter } from "./renderColorFilter";
import { renderGenderFilter } from "./renderGenderFilter";
import { renderTypeFilter } from "./renderTypeFilter";

export const renderFilters = (filters) => {
  renderColorFilter(filters.colors);
  renderGenderFilter(filters.genders);
  renderTypeFilter(filters.types);
};