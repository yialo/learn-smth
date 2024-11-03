// https://learn.javascript.ru/task/array-unique

export const uniqueSlow = (strings) => {
  const uniqueElements = [];

  for (const string of strings) {
    if (!uniqueElements.includes(string)) {
      uniqueElements.push(string);
    }
  }

  return uniqueElements;
};

export const uniqueFast = (strings) => {
  const uniqueElements = new Set();

  for (const string of strings) {
    if (!uniqueElements.has(string)) {
      uniqueElements.add(string);
    }
  }

  return [...uniqueElements];
};
