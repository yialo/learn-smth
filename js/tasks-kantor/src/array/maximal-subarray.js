/**
 * @see {@link https://learn.javascript.ru/task/maximal-subarray}
 */

export const getMaxSubSumSlow = (arr) => {
  if (arr.every((it) => it < 0)) {
    return 0;
  }

  let maxSum = 0;

  for (let i = 0; i < arr.length; i++) {
    let currentSum = 0;

    for (let j = i; j < arr.length; j++) {
      currentSum += arr[j];
      maxSum = Math.max(maxSum, currentSum);
    }
  }

  return maxSum;
};

/** Kadane's algorithm
  @see {@link https://en.wikipedia.org/wiki/Maximum_subarray_problem#Kadane's_algorithm}
*/
export const getMaxSubSumFast = (arr) => {
  let maxSum = 0;
  let currentSum = 0;

  for (const element of arr) {
    currentSum += element;

    if (currentSum >= 0) {
      maxSum = Math.max(maxSum, currentSum);
    } else {
      // Reset, because the currentSum has already become less and cannot be a solution
      currentSum = 0;
    }
  }

  return maxSum;
};
