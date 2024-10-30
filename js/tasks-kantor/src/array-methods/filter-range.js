/**
  @see {@link https://learn.javascript.ru/task/filter-range}
 */

export const filterRange = (numArr, min, max) => {
  return numArr.filter((num) => num >= min && num <= max);
};
