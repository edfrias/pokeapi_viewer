import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderGenderFilter } from './renderGenderFilter';

describe('renderGenderFilter', () => {
  let genderFilterNode;

  beforeEach(() => {
    genderFilterNode = document.createElement('div');
    genderFilterNode.id = 'gender-filter';
    document.body.appendChild(genderFilterNode);
  });

  afterEach(() => {
    document.body.removeChild(genderFilterNode);
    vi.restoreAllMocks();
  });

  it('should log an error and return early if genders is empty', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    renderGenderFilter([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid genders error');
    expect(genderFilterNode.innerHTML).toBe('');
  });

  it('should log an error and return early if genders is missing', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    renderGenderFilter(null);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid genders error');
    consoleErrorSpy.mockRestore();
  });

  it('should log an error and return early if genderFilter element is not found', () => {
    genderFilterNode.id = 'gender-filter2';

    const consoleErrorSpy = vi.spyOn(console, 'error');
    renderGenderFilter([{ name: 'male' }, { name: 'female' }]);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid genderFilter error');
    consoleErrorSpy.mockRestore();
  });

  it('should render the correct gender radio buttons when a valid genders array is provided', () => {
    const genders = [
      { name: 'male' },
      { name: 'female' },
      { name: 'genderless' }
    ];

    renderGenderFilter(genders);
    const expectedHTML = `
      <label tabindex="0"><input type="radio" name="gender" value="male" tabindex="0"> male</label>
      <label tabindex="0"><input type="radio" name="gender" value="female" tabindex="0"> female</label>
      <label tabindex="0"><input type="radio" name="gender" value="genderless" tabindex="0"> genderless</label>
    `;

    expect(genderFilterNode.innerHTML.replace(/\s+/g, ' ').trim()).toBe(expectedHTML.replace(/\s+/g, ' ').trim());
  });
});
