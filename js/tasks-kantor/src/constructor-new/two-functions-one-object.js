/**
  @see {@link https://learn.javascript.ru/task/two-functions-one-object}
 */

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
