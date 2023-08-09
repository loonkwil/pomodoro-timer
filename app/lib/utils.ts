export function formatTime(ms: number): string {
  // 1970-01-01T00:02:00.000Z
  //               ^^^^^
  return new Date(ms).toISOString().substring(14, 19);
}

/**
 * @example roundNearest(13, 5) // => 15
 */
export function roundNearest(value: number, step: number): number {
  return Math.round(value / step) * step;
}
