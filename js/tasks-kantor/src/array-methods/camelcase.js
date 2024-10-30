/**
  @see {@link https://learn.javascript.ru/task/camelcase}
 */

export const camelize = (str) => {
  const isVendorPrefix = str.startsWith('-');
  const significantString = isVendorPrefix ? str.slice(1) : str;
  const significantParts = significantString.split('-');

  return significantParts
    .map((part, partIndex) => {
      if (partIndex === 0 && !isVendorPrefix) return part;
      return capitalize(part);
    })
    .join('');
};

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
