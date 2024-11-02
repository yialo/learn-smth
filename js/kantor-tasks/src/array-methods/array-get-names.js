// https://learn.javascript.ru/task/array-get-names

export const usersToNames = (users) => {
  return users.map(({ name }) => name);
};
