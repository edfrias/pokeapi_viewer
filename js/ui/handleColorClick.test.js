import { describe, it, expect, vi, beforeEach } from 'vitest';
import { state } from '../constants/state';
import { handleColorClick } from './handleColorClick';

describe('handleColorClick', () => {
  beforeEach(() => {
    state.selectedFilters = {
      color: []
    };
  });

  it('should log an error if no event is provided', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    handleColorClick();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid event error');
    consoleErrorSpy.mockRestore();
  });

  it('should do nothing if event target does not contain class "color-box"', () => {
    const event = {
      target: {
        classList: {
          contains: vi.fn().mockReturnValue(false)
        }
      }
    };

    handleColorClick(event);

    expect(event.target.classList.contains).toHaveBeenCalledWith('color-box');
    expect(state.selectedFilters.color).toEqual([]);
  });

  it('should select a color, add the selected class and icon, and update state.selectedFilters.color', () => {
    const colorBox = document.createElement('div');
    colorBox.classList.add('color-box');
    colorBox.dataset.color = 'red';

    const event = {
      target: colorBox
    };

    handleColorClick(event);

    expect(colorBox.classList.contains('selected')).toBe(true);
    expect(colorBox.innerHTML).toContain('svg'); // Verify the check icon is inserted
    expect(state.selectedFilters.color).toEqual(['red']);
  });

  it('should deselect a color, remove the selected class and icon, and update state.selectedFilters.color', () => {
    state.selectedFilters.color = ['red'];

    const colorBox = document.createElement('div');
    colorBox.classList.add('color-box', 'selected');
    colorBox.dataset.color = 'red';
    colorBox.innerHTML = '<svg></svg>'; // The check icon

    const event = {
      target: colorBox
    };

    handleColorClick(event);

    expect(colorBox.classList.contains('selected')).toBe(false);
    expect(colorBox.innerHTML).toBe('');
    expect(state.selectedFilters.color).toEqual([]);
  });

  it('should add a new color to the selectedFilters without duplicates', () => {
    state.selectedFilters.color = ['blue'];

    const colorBox = document.createElement('div');
    colorBox.classList.add('color-box');
    colorBox.dataset.color = 'green';

    const event = {
      target: colorBox
    };

    handleColorClick(event);

    expect(state.selectedFilters.color).toEqual(['blue', 'green']); // Both colors present
  });

  it('should not add duplicates if the color is already in state.selectedFilters.color', () => {
    state.selectedFilters.color = ['red'];

    const colorBox = document.createElement('div');
    colorBox.classList.add('color-box');
    colorBox.dataset.color = 'red';

    const event = {
      target: colorBox
    };

    handleColorClick(event);

    expect(state.selectedFilters.color).toEqual(['red']);
  });
});
