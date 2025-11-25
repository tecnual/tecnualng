/**
 * Adds the specified number of years to the given date.
 * @param date The original date
 * @param years The number of years to add (can be negative)
 * @returns A new Date object with the years added
 */
export function addYears(date: Date, years: number): Date {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
}
