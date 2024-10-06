'use strict';

const RESTRICTED_STRINGS = ['viagra', 'XXX'];

const checkSpam = (str) => {
  const normalized = str.toLowerCase();
  const normalizedRestricted = RESTRICTED_STRINGS.map((str) => str.toLowerCase());

  for (const restriced of normalizedRestricted) {
    if (normalized.includes(restriced)) {
      return true;
    }
  }

  return false;
};

module.exports = checkSpam;
