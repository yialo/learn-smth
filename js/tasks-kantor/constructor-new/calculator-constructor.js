// https://learn.javascript.ru/task/calculator-constructor
'use strict';

function Calculator() {
  this.read = function () {
    this.firstNumber = +prompt('Input first number', 0);
    this.secondNumber = +prompt('Input second number', 0);
  }

  this.getSum = function () {
    return this.firstNumber + this.secondNumber;
  }

  this.getProduct = function () {
    return this.firstNumber * this.secondNumber;
  }
}

const calculator = new Calculator();
calculator.read();
console.log('Sum: ', calculator.getSum());
console.log('Product: ', calculator.getProduct());
