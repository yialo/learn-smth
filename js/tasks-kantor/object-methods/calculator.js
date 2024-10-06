// https://learn.javascript.ru/task/calculator
'use strict';

const calculator = {
  read(a, b) {
    this.a = a;
    this.b = b;
  },

  sum() {
    return this.a + this.b;
  },
  mul() {
    return this.a * this.b;
  },
};

calculator.read(2, 3);
console.log('Sum:', calculator.sum());
console.log('Product:', calculator.mul());
