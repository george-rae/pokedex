/**
 * Splits letters into an iterable array.
 *
 * @example <caption>Example usage of generateLetters</caption>
 * generateLetters("Loading...");
 * // returns `["L", "o", "a", "d", "i", "n", "g", ".", ".", "."]`
 * @param {string} letters string of letters to split out
 * @returns {string[]} array of `letters` to loop through
 */
export function generateLetters(letters: string) {
  return [...letters.split("")];
}
