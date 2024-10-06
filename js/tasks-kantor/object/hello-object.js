// https://learn.javascript.ru/task/hello-object
'use strict';

const obj = {};
console.log('obj:', obj);

obj.name = 'John';
console.log('obj:', obj);

obj.surname = 'Smith';
console.log('obj:', obj);

obj.name = 'Pete';
console.log('obj:', obj);

delete obj.name;
console.log('obj:', obj);
