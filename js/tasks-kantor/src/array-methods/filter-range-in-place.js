/**
  @see {@link https://learn.javascript.ru/task/filter-range-in-place}
 */

const withCounter = (numArr, min, max) => {
  let elementsToRemoveCount = 0;

  const needRemove = (num) => num < min || num > max;

  numArr.forEach((num) => {
    if (needRemove(num)) elementsToRemoveCount += 1;
  });

  while (elementsToRemoveCount > 0) {
    const nextToRemoveIndex = numArr.findIndex((num) => needRemove(num));
    numArr.splice(nextToRemoveIndex, 1);
    elementsToRemoveCount -= 1;
  }

  return numArr;
};

const withWhile = (numArr, min, max) => {
  const needRemove = (num) => num < min || num > max;

  let nextIndexToRemove;

  const assignNextIndexToRemove = () => {
    nextIndexToRemove = numArr.findIndex((num) => needRemove(num));
  };

  assignNextIndexToRemove();

  while (nextIndexToRemove !== -1) {
    numArr.splice(nextIndexToRemove, 1);
    assignNextIndexToRemove();
  }

  return numArr;
};

export const filterRangeInPlace = {
  withCounter,
  withWhile,
};
