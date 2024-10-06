'use strict';

const readNumber = () => {
  const input = prompt('Введите число');

  if (input === '' || input === null) {
    alert(null);
  } else if (Number.isFinite(+input)) {
    alert(`Вы ввели число: ${input}`);
  } else {
    readNumber();
  }
}

readNumber();
