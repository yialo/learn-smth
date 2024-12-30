export const fetchData = async () => {
  await sleep(1000);
  const response = await fetch('https://www.swapi.tech/api/people');
  return response.json();
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
