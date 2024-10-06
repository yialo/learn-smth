export interface Hero {
  name: string;
  url: string;
}

export const debounce = <Args extends unknown[]>(
  fn: (...args: Args) => unknown,
  delayInMs: number
) => {
  let timer: number;
  return (...args: Args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delayInMs);
  };
};

export const fetchHeroes = (
  nameQuery: string,
  page: number = 1,
  options: RequestInit = {}
) => {
  if (options.signal) {
    options.signal.addEventListener("abort", () => {
      console.log("fetchHeroes: request cancelled");
    });
  }
  console.log("fetchHeroes: request sent");
  return fetch(
    `https://swapi.dev/api/people/?page=${page}&search=${nameQuery}`,
    options
  ).then((response) => response.json());
};
