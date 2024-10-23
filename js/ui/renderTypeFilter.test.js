import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderTypeFilter } from './renderTypeFilter';

describe('renderTypeFilter', () => {
  let typeFilterNode;

  beforeEach(() => {
    typeFilterNode = document.createElement('div');
    typeFilterNode.id = 'type-filter';
    document.body.appendChild(typeFilterNode);
  });

  afterEach(() => {
    document.body.removeChild(typeFilterNode);
    vi.restoreAllMocks();
  });

  it('should log an error and return early if types array is not provided', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    renderTypeFilter();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid types error');
    expect(typeFilterNode.innerHTML).toBe('');
    consoleErrorSpy.mockRestore();
  });

  it('should log an error and return early if typeFilter element is not found', () => {
    typeFilterNode.id = 'type-filter2';

    const consoleErrorSpy = vi.spyOn(console, 'error');

    renderTypeFilter([{ name: 'fire' }, { name: 'water' }]);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid typeFilter error');
    consoleErrorSpy.mockRestore();
  });

  it('should render the correct type checkboxes when a valid types array is provided', () => {
    const types = [
      { name: 'fire' },
      { name: 'water' },
      { name: 'grass' }
    ];

    renderTypeFilter(types);

    const expectedHTML = `
      <label><input type="checkbox" name="type" value="fire"> fire</label>
      <label><input type="checkbox" name="type" value="water"> water</label>
      <label><input type="checkbox" name="type" value="grass"> grass</label>
    `;

    expect(typeFilterNode.innerHTML.replace(/\s+/g, ' ').trim()).toBe(expectedHTML.replace(/\s+/g, ' ').trim());
  });
});
