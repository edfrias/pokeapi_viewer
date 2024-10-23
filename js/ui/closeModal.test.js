import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { closeModal } from './closeModal';
import { handleEscKey } from './handleEscKey';

describe('closeModal', () => {
  let modalElement;

  beforeEach(() => {
    modalElement = document.createElement('div');
    modalElement.id = 'modal';
    modalElement.style.display = 'block';
    document.body.appendChild(modalElement);

    vi.spyOn(document, 'removeEventListener');
  });

  afterEach(() => {
    document.body.removeChild(modalElement);
    vi.restoreAllMocks();
  });

  it('should hide the modal by setting its display to none', () => {
    closeModal();

    expect(modalElement.style.display).toBe('none');
  });

  it('should remove the handleEscKey listener from the keydown event', () => {
    closeModal();

    expect(document.removeEventListener).toHaveBeenCalledWith('keydown', handleEscKey);
  });
});
