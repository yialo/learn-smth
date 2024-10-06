// https://learn.javascript.ru/task/chain-calls
'use strict';

const ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep() {
    console.log('Current step:', this.step);
    return this;
  }
};

ladder.showStep()
  .up().showStep()
  .up().showStep()
  .down().showStep();
