// https://learn.javascript.ru/task/shuffle
// Fisher–Yates shuffle: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle

/**
  @param {unknown[]} array Initial array
 */
export const shuffle = (array) => {
  const result = [];
  const inputCopy = [...array];

  for (let i = array.length - 1; i >= 0; i--) {
    /*
    The same as:
    const randomNumber = Math.floor(Math.random() * (i + 1));
    */
    const randomIndex = getRandomIntegerFromRange(0, i);

    const randomElement = inputCopy[randomIndex];
    result.push(randomElement);
    inputCopy.splice(randomIndex, 1);
  }

  return result;
};

function getRandomIntegerFromRange(min, max) {
  const randomNumber = min + Math.random() * (max - min + 1);
  return Math.floor(randomNumber);
}

const NEED_COUNT_CHANCES = true;

if (NEED_COUNT_CHANCES) {
  const occurrences = {
    123: 0,
    132: 0,
    213: 0,
    231: 0,
    321: 0,
    312: 0,
  };

  for (let i = 0; i < 1000000; i++) {
    const result = shuffle([1, 2, 3]);
    occurrences[result.join('')]++;
  }

  console.log('occurrence', occurrences);
}
