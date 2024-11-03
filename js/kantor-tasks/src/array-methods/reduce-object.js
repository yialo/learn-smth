// https://learn.javascript.ru/task/reduce-object

export const groupById = (persons) => {
  return persons.reduce((grouped, person) => {
    grouped[person.id] = person;
    return grouped;
  }, {});
};
