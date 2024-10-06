'use strict';

/**
 * @see https://learn.javascript.ru/task/random-min-max
 */

function random(min, max) {
  const delta = Math.abs(max - min);
  return min + delta * Math.random();
}

console.log(random(8, 14));
