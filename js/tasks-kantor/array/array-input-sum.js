'use strict';

/**
 * @see {@link https://learn.javascript.ru/task/array-input-sum}
 */

const sumInput = () => {
  const inputs = [];

  while (true) {
    const currentInput = Number.parseFloat(window.prompt('Введите число', 0));

    if (typeof currentInput !== 'number' || Number.isNaN(currentInput)) {
      break;
    }

    inputs.push(currentInput);
  }

  const sum = inputs.reduce((acc, it) => acc + it, 0);

  alert(`Сумма введённых чисел: ${sum}`);
};

sumInput();
