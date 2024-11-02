// https://learn.javascript.ru/task/map-objects

export const usersToUsersWithFullName = (users) => {
  return users.map(({ name, surname, id }) => ({
    id,
    fullName: `${name} ${surname}`,
  }));
};
