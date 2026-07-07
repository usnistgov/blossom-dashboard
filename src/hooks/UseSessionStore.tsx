import { useState, useEffect } from "react";

function useSessionDatesStore(
  storeKey: string,
  defaultValue: Array<Date> = []
) {
  const [arrayValue, setArrayValue] = useState<Array<Date>>(() => {
    // Check if browser window is defined to handle server-side rendering
    if (typeof window !== "undefined") {
      const stored = window.sessionStorage.getItem(storeKey);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Convert date strings back to Date objects
          if (Array.isArray(parsed)) {
            return parsed.map((item) => new Date(item));
          }
          return parsed;
        } catch (error) {
          console.error("Failed to parse JSON from sessionStorage", error);
        }
      }
    }
    return defaultValue;
  });

  const addDate = (): Date => {
    // Add a new Date object to the array
    const theNewDate = new Date();
    setArrayValue((value: Array<Date>) => [theNewDate, ...value]);
    return theNewDate;
  };

  const clearDates = (): void => {
    // Clear the array
    setArrayValue([]);
  };

  useEffect(() => {
    // Convert Date objects to ISO strings before saving
    const arrayToStore = Array.isArray(arrayValue)
      ? arrayValue.map((item) =>
          item instanceof Date ? item.toISOString() : item
        )
      : arrayValue;

    // Store the stringified array
    window.sessionStorage.setItem(storeKey, JSON.stringify(arrayToStore));
  }, [storeKey, arrayValue]);

  return { arrayValue, setArrayValue, addDate, clearDates };
}

export default useSessionDatesStore;
