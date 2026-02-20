import { addDays, isBefore, isAfter, areIntervalsOverlapping } from "date-fns";

export interface DateRange {
  start: Date;
  end: Date;
}

export const BUFFER_DAYS = 3;

/**
 * Checks if a requested rental period is available given existing rentals.
 * Each rental requires a BUFFER_DAYS gap for cleaning and logistics.
 *
 * @param requestedRange The desired delivery and return dates {start: Date, end: Date}
 * @param existingRentals Array of confirmed rental ranges
 * @returns boolean indicating if the costume is available
 */
export function isAvailable(
  requestedRange: DateRange,
  existingRentals: DateRange[]
): boolean {
  // The requested range with buffers applied for checking overlaps
  // However, a cleaner way is to check overlap with "blocked" intervals.
  // If rental 1 is [S1, E1], it blocks [S1 - BUFFER, E1 + BUFFER] for any other rental's ACTUAL period.

  return !existingRentals.some((existing) => {
    // A costume is unavailable if the requested range overlaps with
    // [existing.start - BUFFER, existing.end + BUFFER]
    const blockedInterval = {
      start: addDays(existing.start, -BUFFER_DAYS),
      end: addDays(existing.end, BUFFER_DAYS),
    };

    return areIntervalsOverlapping(requestedRange, blockedInterval, { inclusive: true });
  });
}

/**
 * Calculates the required logistics dates based on the wedding date.
 * @param weddingDate The date of the event
 * @returns Object containing delivery (D-2) and return (D+1) dates
 */
export function calculateLogisticsDates(weddingDate: Date) {
  return {
    deliveryDate: addDays(weddingDate, -2),
    returnDate: addDays(weddingDate, 1),
  };
}
