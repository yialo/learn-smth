// https://learn.javascript.ru/task/pow
'use strict';

function pow(x, n) {
  let result = x;
  for (let i = 2; i <= n; i++) result *= x;
  return result;
}

function checkIndex(num) {
  return (Number.isInteger(num) && num >= 1);
}

function showResult(base, index, result) {
  alert (`${base}^${index} = ${result}`);
}

function getBase() {
  return +prompt('Введине основание', '');
}

function getIndex() {
  return +prompt('Введите показатель', '');
};

function multiplicate() {
  const base = getBase();

  let index = getIndex();

  while (!checkIndex(index)) {
    alert('Поддерживаются только натуральные показатели');
    index = getIndex();
  }

  showResult(base, index, pow(base, index));
}

multiplicate();
