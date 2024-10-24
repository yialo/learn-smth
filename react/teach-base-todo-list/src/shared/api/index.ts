const MIN_DELAY = 1000;
const MAX_DELAY = 2000;

const sleep = (delay = MIN_DELAY) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

const getRandomDelay = () => {
  const delay = MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY + 1);
  return Math.floor(delay);
};

export const fetchData = async <D>(data: D) => {
  const delay = getRandomDelay();
  await sleep(delay);
  return data;
};
