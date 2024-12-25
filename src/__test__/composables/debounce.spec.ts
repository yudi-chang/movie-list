import { describe, vi, it, expect, beforeEach } from 'vitest';
import { useDebounce } from '@/composables/debounce';

describe('useDebounce', () => {
  let callback: (arg?: string) => void;
  let debounce: (arg?: any) => void;
  let isWaiting: any;

  beforeEach(() => {
    callback = vi.fn();
    
    const result = useDebounce(callback, 200);
    debounce = result.debounce;
    isWaiting = result.isWaiting;
    vi.useFakeTimers();
  });

  it('should debounce the callback and wait for the specified delay', async () => {
    debounce('test1');
    debounce('test2');
    debounce('test3');
    
    expect(callback).not.toHaveBeenCalled();
    expect(isWaiting.value).toBe(true);

    vi.advanceTimersByTime(250);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('test3');
    expect(isWaiting.value).toBe(false);
  });

  it('should cancel the previous timeout and reset debounce when called multiple times quickly', async () => {
    debounce('test1');
    debounce('test2');

    vi.advanceTimersByTime(100);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(250);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('test2');
  });
});
