/**
 * @see https://learn.javascript.ru/task/random-int-min-max
 */

const isInteger = (num) => Number.isInteger(num);

export function randomInteger(min, max) {
  if (!isInteger(min) || !isInteger(max)) {
    throw new Error('Arguments must be integer');
  }

  const scaledRandom = min + Math.random() * (max + 1 - min);
  return Math.floor(scaledRandom);
}
