// https://learn.javascript.ru/task/multiply-numeric
'use strict';

const multiplyNumeric = (target) => {
  for (const prop in target) {
    if (typeof target[prop] === 'number') {
      target[prop] *= 2;
    }
  }
};

const menu = {
  width: 200,
  height: 300,
  title: "My menu",
};
console.log(menu);
multiplyNumeric(menu);
console.log(menu);
