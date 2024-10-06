'use strict';

/**
 * @see {@link https://learn.javascript.ru/task/create-array}
 */

exports.createArray = () => {
  const styles = ['Джаз', 'Блюз'];
  styles.push('Рок-н-ролл');

  const centerNumber = Math.floor((styles.length - 1) / 2)
  styles[1] = 'Классика';

  console.log(styles.shift());
  styles.unshift('Рэп', 'Регги');
  return styles;
};
