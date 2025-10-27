// CODE

import { expect, it } from 'vitest';
import { z } from 'zod';

const StarWarsPerson = z.object({
  name: z.string(),
});
const StarWarsPeopleResults = z.array(StarWarsPerson)
const StarWarsPeopleResponseData = z.object({
  results: StarWarsPeopleResults
})

export const fetchStarWarsPeople = async () => {
  const data = await fetch('https://swapi.py4e.com/api/people').then((res) =>
    res.json(),
  );

  const parsedData = StarWarsPeopleResponseData.parse(data);

  return parsedData.results;
};

// TESTS

it('Should return the name', async () => {
  expect((await fetchStarWarsPeople())[0]).toEqual({
    name: 'Luke Skywalker',
  });
});
