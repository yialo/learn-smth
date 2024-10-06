'use strict';

const truncate = (str, maxlength) => {
  if (typeof str !== 'string') {
    return;
  }

  return str.length > maxlength
    ? `${str.slice(0, maxlength - 1)}…`
    : str;
};

module.exports = truncate;
