'use strict';

const person = {
  name: 'Bob',
  age: 25,
  isHired: true,
};

function showSimpleInfo(tel, email) {
  console.log(`Name: Basil, tel: ${tel}, email: ${email}`);
}

function showComplexInfo(tel, email) {
  console.log(`Name: ${this.name}, tel: ${tel}, email: ${email}`);
}

function bind(fn, ctx, ...boundArgs) {
  if (ctx === null || typeof ctx !== 'object' && typeof ctx !== 'function') {
    return (...args) => fn(...boundArgs, ...args);
  }

  return (...args) => {
    const fieldId = Symbol('fieldId');
    ctx[fieldId] = fn;
    const result = ctx[fieldId](...boundArgs, ...args);
    delete ctx[fieldId];
    return result;
  };
}

console.group('bind:');
bind(showSimpleInfo, null)('321475', 'basil@gmail.com');
bind(showComplexInfo, person)('123456', 'bob@gmail.com');
bind(showComplexInfo, person, '123456')('bob@gmail.com');
bind(showComplexInfo, person, '123456', 'bob@gmail.com')();
console.groupEnd();

function _legacyBind_(fn, ctx) {
  const getArgs = function (args, leftShift) {
    return Array.prototype.slice.call(args, leftShift);
  };

  const boundArgs = getArgs(arguments, 2);
  return function () {
    const args = getArgs(arguments);
    const allArgs = boundArgs.concat(args);
    return fn.apply(ctx, allArgs);
  };
}

console.group('Legacy bind:');
_legacyBind_(showSimpleInfo, null)('321475', 'basil@gmail.com');
_legacyBind_(showComplexInfo, person)('123456', 'bob@gmail.com');
_legacyBind_(showComplexInfo, person, '123456')('bob@gmail.com');
_legacyBind_(showComplexInfo, person, '123456', 'bob@gmail.com')();
console.groupEnd();
