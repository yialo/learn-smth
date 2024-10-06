// https://learn.javascript.ru/task/sum-object
'use strict';

const salaries = {
  John: 100,
  Ann: 160,
  Pete: 130,
};

const sumSalaries = (salariesEnum) => {
  let sum = 0;

  for (const prop in salariesEnum) {
    sum += salariesEnum[prop];
  }

  return sum;
};

console.log(sumSalaries(salaries));
