'use strict';

/**
 * @see https://learn.javascript.ru/task/random-int-min-max
 */

function randomInteger(min, max) {
  const scaledRandom = min + Math.random() * (max - min + 1);
  return Math.floor(scaledRandom);
}

console.log(randomInteger(1, 3));

module.exports = randomInteger;
