// https://learn.javascript.ru/task/accumulator
'use strict';

function Accumulator(startingValue) {
  this.value = startingValue;

  this.read = function () {
    this.value += +prompt('Input next value', 0);
  }
}

const accumulator = new Accumulator(3);
accumulator.read();
accumulator.read();
console.log(accumulator.value);
