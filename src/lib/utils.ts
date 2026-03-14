/**
 * Merge class names — simple join + trim approach (no clsx dependency).
 * Filters out falsy values so you can do: cn("base", condition && "extra")
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ").trim();
}

/**
 * Format a date into a human-readable string.
 * Defaults to "Month Day, Year" format (e.g., "March 14, 2026").
 */
export function formatDate(
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "Invalid date";

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return d.toLocaleDateString("en-US", options ?? defaultOptions);
}
