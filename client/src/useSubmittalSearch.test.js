import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSubmittalSearch } from './useSubmittalSearch';

describe('useSubmittalSearch', () => {
  it('should initialize with empty state', () => {
    const { result } = renderHook(() => useSubmittalSearch());
    
    expect(result.current.results).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.hasSearched).toBe(false);
  });

  it('should not search with empty query', async () => {
    const { result } = renderHook(() => useSubmittalSearch());
    
    await act(async () => {
      await result.current.search('   ');
    });

    expect(result.current.hasSearched).toBe(false);
    expect(result.current.results).toEqual([]);
  });

  it('should clear results when clearResults is called', async () => {
    const { result } = renderHook(() => useSubmittalSearch());
    
    await act(async () => {
      result.current.clearResults();
    });

    expect(result.current.results).toEqual([]);
    expect(result.current.hasSearched).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
