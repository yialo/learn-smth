// https://learn.javascript.ru/task/repeat-until-correct
'use strict';

let input;
do input = prompt('Введите число, большее 100', '');
while (input !== null && (Number.isNaN(+input) || input <= 100));
