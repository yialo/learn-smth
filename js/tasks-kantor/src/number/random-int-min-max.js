/**
 * @see https://learn.javascript.ru/task/random-int-min-max
 */

export function randomInteger(min, max) {
  const scaledRandom = min + Math.random() * (max - min + 1);
  return Math.floor(scaledRandom);
}
