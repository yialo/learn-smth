// https://learn.javascript.ru/task/is-empty
'use strict';

const isEmpty = (target) => {
  for (const prop in target) {
    return false;
  }
  return true;
};

console.log('{}:', isEmpty({}));
console.log(`{ name: 'Bob' }`, isEmpty({ name: 'Bob' }));
