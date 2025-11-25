import { describe, it, expect } from 'vitest';
import { addYears } from './date-utils';

describe('DateUtils', () => {
  it('should add years correctly', () => {
    const date = new Date(2020, 0, 1); // Jan 1, 2020
    const newDate = addYears(date, 1);
    expect(newDate.getFullYear()).toBe(2021);
    expect(newDate.getMonth()).toBe(0);
    expect(newDate.getDate()).toBe(1);
  });

  it('should handle leap years correctly', () => {
    const date = new Date(2024, 1, 29); // Feb 29, 2024
    const newDate = addYears(date, 1);
    // Should be Mar 1, 2025
    expect(newDate.getFullYear()).toBe(2025);
    expect(newDate.getMonth()).toBe(2); // March is 2
    expect(newDate.getDate()).toBe(1);
  });

  it('should subtract years correctly', () => {
    const date = new Date(2020, 0, 1);
    const newDate = addYears(date, -1);
    expect(newDate.getFullYear()).toBe(2019);
  });
});
