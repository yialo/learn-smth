// @NOTE The same as here:
const SWAPI_URL = 'https://www.swapi.tech/api/people';

const data = {
  message: 'ok',
  total_records: 82,
  total_pages: 9,
  previous: null,
  next: 'https://www.swapi.tech/api/people?page=2&limit=10',
  results: [
    {
      uid: '1',
      name: 'Luke Skywalker',
      url: 'https://www.swapi.tech/api/people/1',
    },
    {
      uid: '2',
      name: 'C-3PO',
      url: 'https://www.swapi.tech/api/people/2',
    },
    {
      uid: '3',
      name: 'R2-D2',
      url: 'https://www.swapi.tech/api/people/3',
    },
    {
      uid: '4',
      name: 'Darth Vader',
      url: 'https://www.swapi.tech/api/people/4',
    },
    {
      uid: '5',
      name: 'Leia Organa',
      url: 'https://www.swapi.tech/api/people/5',
    },
    {
      uid: '6',
      name: 'Owen Lars',
      url: 'https://www.swapi.tech/api/people/6',
    },
    {
      uid: '7',
      name: 'Beru Whitesun lars',
      url: 'https://www.swapi.tech/api/people/7',
    },
    {
      uid: '8',
      name: 'R5-D4',
      url: 'https://www.swapi.tech/api/people/8',
    },
    {
      uid: '9',
      name: 'Biggs Darklighter',
      url: 'https://www.swapi.tech/api/people/9',
    },
    {
      uid: '10',
      name: 'Obi-Wan Kenobi',
      url: 'https://www.swapi.tech/api/people/10',
    },
  ],
};

export const fetchData = async () => {
  await sleep(1000);
  /* const response = await fetch(SWAPI_URL);
  return response.json(); */
  return data;
};

export const throwOverTime = async () => {
  await sleep(1000);
  throw new Error('error');
};

const sleep = (delayMs: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), delayMs);
  });
};
