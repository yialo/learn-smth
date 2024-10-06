// https://learn.javascript.ru/task/check-login
'use strict';

const login = prompt('Введите логин', '');

if (login === null || login === '') {
  alert('Отменено');
} else if (login === 'Админ') {
  const password = prompt('Введите пароль', '');

  if (password === null) {
    alert('Отменено');
  } else if (password === 'Я главный') {
    alert('Здравствуйте!');
  } else {
    alert('Неверный пароль');
  }
} else {
  alert('Я Вас не знаю');
}
