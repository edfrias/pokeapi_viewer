import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderFilters } from './renderFilters';
import { renderColorFilter } from './renderColorFilter';
import { renderGenderFilter } from './renderGenderFilter';
import { renderTypeFilter } from './renderTypeFilter';

vi.mock('./renderColorFilter');
vi.mock('./renderGenderFilter');
vi.mock('./renderTypeFilter');

describe('renderFilters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should log an error and return early if filters are not provided', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    renderFilters();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid filters error');
    expect(renderColorFilter).not.toHaveBeenCalled();
    expect(renderGenderFilter).not.toHaveBeenCalled();
    expect(renderTypeFilter).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it('should not throw an error if filters object is empty, but sub-functions should be called with empty arrays', () => {
    const filters = {
      colors: [],
      genders: [],
      types: []
    };

    renderFilters(filters);

    expect(renderColorFilter).toHaveBeenCalledWith(filters.colors);
    expect(renderGenderFilter).toHaveBeenCalledWith(filters.genders);
    expect(renderTypeFilter).toHaveBeenCalledWith(filters.types);
  });

  it('should call renderColorFilter, renderGenderFilter, and renderTypeFilter with the appropriate data when valid filters are provided', () => {
    const filters = {
      colors: ['red', 'blue'],
      genders: [{ name: 'male' }, { name: 'female' }],
      types: [{ name: 'fire' }, { name: 'water' }]
    };

    renderFilters(filters);

    expect(renderColorFilter).toHaveBeenCalledWith(filters.colors);
    expect(renderGenderFilter).toHaveBeenCalledWith(filters.genders);
    expect(renderTypeFilter).toHaveBeenCalledWith(filters.types);
  });
});
