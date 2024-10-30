/**
  @see {@link https://learn.javascript.ru/task/filter-range}
 */

export const filterRange = (arr, min, max) => {
  return arr.filter((num) => min <= num && num <= max);
};
