const RESTRICTED_STRINGS = ['viagra', 'XXX'];

export const checkSpam = (str) => {
  const normalized = str.toLowerCase();
  const normalizedRestricted = RESTRICTED_STRINGS.map((str) =>
    str.toLowerCase(),
  );

  for (const restriced of normalizedRestricted) {
    if (normalized.includes(restriced)) {
      return true;
    }
  }

  return false;
};
