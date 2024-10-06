'use strict';

function getGreatestCommonFactor(a, b) {
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    return 'Оба числа должны быть целыми';
  }

  if (a === 0 && b === 0) {
    return 'Хотя бы одно из чисел должно быть отличным от нуля';
  }

  while (a !== 0 && b !== 0) {
    if (a > b) a %= b;
    else b %= a;
  }

  return a + b;
}

console.log(getGreatestCommonFactor(30, 18));
