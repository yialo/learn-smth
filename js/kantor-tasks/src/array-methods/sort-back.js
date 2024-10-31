// https://learn.javascript.ru/task/sort-back

export const sortBack = (numArrar) => {
  return [...numArrar].sort((left, right) => right - left);
};
