/**
 * backoff.js
 *
 * Returns an exponential backoff delay in milliseconds.
 *
 * @param {number} attempt  0-based attempt count
 * @param {number} base     Base delay in ms (default 500)
 * @param {number} max      Max delay cap in ms (default 15000)
 * @returns {number}
 */
export function getBackoffDelay(attempt, base = 500, max = 15_000) {
  const delay = Math.min(base * 2 ** attempt, max)
  // Add ±15% jitter to avoid thundering herd
  return delay * (0.85 + Math.random() * 0.3)
}
