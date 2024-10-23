import { describe, it, expect, vi } from 'vitest';
import { closeModal } from './closeModal';
import { handleEscKey } from './handleEscKey';

vi.mock('./closeModal', () => ({
  closeModal: vi.fn()
}));

describe('handleEscKey', () => {
  it('should call closeModal when the ESC key is pressed', () => {
    const event = { key: 'Escape' };

    handleEscKey(event);
    expect(closeModal).toHaveBeenCalled();
  });

  it('should not call closeModal if the key is not ESC', () => {
    const event = { key: 'Enter' };

    handleEscKey(event);
    expect(closeModal).not.toHaveBeenCalled();
  });

  it('should log an error if the event is invalid', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    handleEscKey(null);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid event error');
    consoleErrorSpy.mockRestore();
  });
});
