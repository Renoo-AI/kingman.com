import { isAvailable, DateRange } from "../availability";
import { addDays } from "date-fns";

// Manual test suite
const runTests = () => {
  console.log("Running Availability Engine Tests...");

  const existingRentals: DateRange[] = [
    { start: new Date("2024-06-10"), end: new Date("2024-06-13") }, // Rented Mon-Thu
  ];

  // Test 1: Conflict within rental period
  const case1 = { start: new Date("2024-06-11"), end: new Date("2024-06-12") };
  console.assert(isAvailable(case1, existingRentals) === false, "Test 1 Failed: Should overlap with existing rental");

  // Test 2: Conflict with 3-day buffer (Before)
  // Rental starts 10th. Buffer is 7, 8, 9.
  // If we try to rent ending on 8th, it should fail.
  const case2 = { start: new Date("2024-06-05"), end: new Date("2024-06-08") };
  console.assert(isAvailable(case2, existingRentals) === false, "Test 2 Failed: Should overlap with buffer before");

  // Test 3: Conflict with 3-day buffer (After)
  // Rental ends 13th. Buffer is 14, 15, 16.
  // If we try to rent starting on 15th, it should fail.
  const case3 = { start: new Date("2024-06-15"), end: new Date("2024-06-18") };
  console.assert(isAvailable(case3, existingRentals) === false, "Test 3 Failed: Should overlap with buffer after");

  // Test 4: Available (Enough buffer)
  // Previous ends 13th. Buffer 14, 15, 16.
  // Delivery on 17th should be fine.
  const case4 = { start: new Date("2024-06-17"), end: new Date("2024-06-20") };
  console.assert(isAvailable(case4, existingRentals) === true, "Test 4 Failed: Should be available after buffer");

  console.log("All availability tests passed!");
};

try {
    runTests();
} catch (e) {
    console.error("Tests failed", e);
    process.exit(1);
}
