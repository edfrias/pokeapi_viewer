import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderColorFilter } from './renderColorFilter';

describe('renderColorFilter', () => {
  let colorFilterNode;

  beforeEach(() => {
    colorFilterNode = document.createElement('div');
    colorFilterNode.id = 'color-filter';
    document.body.appendChild(colorFilterNode);
  });

  afterEach(() => {
    document.body.removeChild(colorFilterNode);
    vi.restoreAllMocks();
  });

  it('should log an error and return early if colors array is missing', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    renderColorFilter(null);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid colors error');
    consoleErrorSpy.mockRestore();
  });

  it('should log an error and return early if colors array is empty', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    renderColorFilter([]);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid colors error');
    expect(colorFilterNode.innerHTML).toBe('');
    consoleErrorSpy.mockRestore();
  });

  it('should log an error and return early if colorFilter element is not found', () => {
    colorFilterNode.id = 'color-filter2';

    const consoleErrorSpy = vi.spyOn(console, 'error');
    renderColorFilter([{ name: 'red' }, { name: 'blue' }]);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid colorFilter error');
    consoleErrorSpy.mockRestore();
  });

  it('should render the correct color boxes when a valid colors array is provided', () => {
    const colors = [
      { name: 'red' },
      { name: 'blue' },
      { name: 'green' }
    ];

    renderColorFilter(colors);

    const expectedHTML = `
      <div class="color-box red" data-color="red" style="background-color: red" tabindex="0"></div>
      <div class="color-box blue" data-color="blue" style="background-color: blue" tabindex="0"></div>
      <div class="color-box green" data-color="green" style="background-color: green" tabindex="0"></div>
    `;

    expect(colorFilterNode.innerHTML.replace(/\s+/g, ' ').trim()).toBe(expectedHTML.replace(/\s+/g, ' ').trim());
  });
});
