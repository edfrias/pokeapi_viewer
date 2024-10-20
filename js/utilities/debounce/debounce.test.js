import { describe, it, expect, vi } from 'vitest';
import { debounce } from '.';

describe('debounce', () => {
    it('should delay the execution of the function', () => {
        const mockFn = vi.fn();
        const debouncedFunc = debounce(mockFn, 600);

        debouncedFunc();

        vi.advanceTimersByTime(400);
        expect(mockFn).not.toHaveBeenCalled();

        vi.advanceTimersByTime(200);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should reset the delay if called again before the time is up', () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, 500);

        debouncedFn();

        vi.advanceTimersByTime(300);
        expect(mockFn).not.toHaveBeenCalled();

        debouncedFn();

        vi.advanceTimersByTime(300);
        expect(mockFn).not.toHaveBeenCalled();

        vi.advanceTimersByTime(200);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});
