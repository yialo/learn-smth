// https://learn.javascript.ru/task/list-primes
'use strict';

const MIN = 2;

let num;
do num = +prompt('Введите натуральное число', '');
while (
  num === null
  || Number.isNaN(num)
  || !Number.isInteger(num)
  || num < MIN
);
alert(`Вы ввели: ${num}. Выводим простые числа от ${MIN} до ${num}:`);

for (let i = MIN; i <= num; i++) {
  let isPrime = true;

  for (let j = MIN; j <= Math.sqrt(i); j++) {
    if (i % j === 0) {
      isPrime = false;
      break;
    }
  }

  if (isPrime) {
    alert (`Простое число: ${i}`);
  }
}
