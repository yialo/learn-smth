'use strict';

function checkIsPrime(num) {
  let i = 2;
  let j = 0;

  while (i ** 2 <= num && j !== 1) {
    if (num % i === 0) {
      j = 1;
    }

    i += 1;
  }

  return `Число ${num} является ${j === 1 ? 'составным' : 'простым'}`;
}

console.log(checkIsPrime(3));
