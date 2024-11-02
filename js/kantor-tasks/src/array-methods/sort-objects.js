// https://learn.javascript.ru/task/sort-objects

export const sortByAgeAsc = (users) => {
  return [...users].sort((left, right) => left.age - right.age);
};
