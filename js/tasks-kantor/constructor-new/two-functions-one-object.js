// https://learn.javascript.ru/task/two-functions-one-object
'use strict';

const obj = {};

function A() {
  return obj;
}

function B() {
  return obj;
}

const a = new A();
const b = new B();
console.log(a === b);
