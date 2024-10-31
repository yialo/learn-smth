// https://learn.javascript.ru/task/calculator-extendable

/**
  @param {string} input
  @returns {number}
  @throws {Error} Argument converts to NaN
 */
const toNumber = (numString) => {
  const num = Number(numString);

  if (Number.isNaN(num)) throw new Error(`Param '${numString}' is wrong`);

  return num;
};

/**
  @param {string} input
  @returns {[number, string, number]}
  @throws {Error} Bad input
 */
const parseInput = (input) => {
  const splitted = input.split(/\s+/);

  if (splitted.length !== 3) {
    throw new Error("Input should have shape: 'number operator number'");
  }

  const [operand1String, operator, operand2String] = splitted;

  const operand1 = toNumber(operand1String);
  const operand2 = toNumber(operand2String);

  return [operand1, operator, operand2];
};

export class Calculator {
  #methods = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
  };

  /**
    @param {string} input
    @returns {number}
  */
  calculate(input) {
    const [operand1, operator, operand2] = parseInput(input);

    const method = this.#methods[operator];

    if (!method) {
      throw new Error(`Unknows operator: ${operator}`);
    }

    return method(operand1, operand2);
  }

  /**
    @callback actionCallback
    @param {number} a - 1st operand
    @param {number} b - 2nd operand
   */

  /**
    @param {string} operator
    @param {actionCallback} action
   */
  addMethod(operator, action) {
    this.#methods[operator] = action;
  }
}
