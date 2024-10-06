'use strict';

/**
 * @see {@link https://learn.javascript.ru/task/maximal-subarray}
 */

exports.getMaxSubSumSlow = (arr) => {
  if (arr.every(it => it < 0) ) {
    return 0;
  }

  let maxSum = 0;

  for (let i = 0; i < arr.length; i++) {
    let partialSum = 0;

    for (let j = i; j < arr.length; j++) {
      partialSum += arr[j];
      maxSum = Math.max(maxSum, partialSum);
    }
  }

  return maxSum;
};

exports.getMaxSubSumFast = (arr) => {
  let maxSum = 0;
  let partialSum = 0;

  for (const item of arr) {
    partialSum += item;

    if (partialSum >= 0) {
      maxSum = Math.max(maxSum, partialSum);
    } else {
      partialSum = 0;
    }
  }

  return maxSum;
};
