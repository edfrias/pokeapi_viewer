import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { handleResponsiveMenuVisibility } from './handleResponsiveMenuVisibility';

describe('handleResponsiveMenuVisibility', () => {
  let filtersNode, closeFiltersTrigger;

  beforeEach(() => {
    filtersNode = document.createElement('div');
    filtersNode.id = 'filters';
    document.body.appendChild(filtersNode);

    closeFiltersTrigger = document.createElement('button');
    closeFiltersTrigger.id = 'close-filters';
    document.body.appendChild(closeFiltersTrigger);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should log an error if filtersNode or closeFiltersTrigger is not found', () => {
    document.body.innerHTML = '';

    const consoleErrorSpy = vi.spyOn(console, 'error');

    handleResponsiveMenuVisibility();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid node error');
    consoleErrorSpy.mockRestore();
  });

  it('should display the filtersNode and attach the click event to hide it', () => {
    handleResponsiveMenuVisibility();

    expect(filtersNode.style.display).toBe('flex');
    closeFiltersTrigger.click();
    expect(filtersNode.style.display).toBe('none');
  });

  it('should not log an error when filtersNode and closeFiltersTrigger are valid', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    handleResponsiveMenuVisibility();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
