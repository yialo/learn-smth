// https://learn.javascript.ru/task/average-age

export const getAverageAge = (persons) => {
  if (!persons.length) return 0;

  const ageSum = persons.reduce((sum, { age }) => sum + age, 0);
  return Math.round(ageSum / persons.length);
};
