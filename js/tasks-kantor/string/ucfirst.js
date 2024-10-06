'use strict';

const ucFirst = (str) => {
  const firstChar = str[0];

  if (!firstChar) {
    return str;
  }

  const nextChars = str.slice(1);
  return `${firstChar.toUpperCase()}${nextChars}`;
};

module.exports = ucFirst;
