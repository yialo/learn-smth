const waitForPromiseArrayAndLog = (asyncArray) => {
  Promise.all(asyncArray).then((result) => {
    console.log(result);
  });
};

const INPUT = ["a", "b", "c"];

const arrayMapDrivenResult = INPUT.map(async (el, i) => {
  await Promise.resolve();
  return `${el}_${i}`;
});
console.log("arrayMapDrivenResult", arrayMapDrivenResult);

const asyncForLoop = (array) => {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    const makePromise = async () => {
      await Promise.resolve();

      const el = array[i];
      return `${el}_${i}`;
    };

    result.push(makePromise());
  }

  return result;
};

const forLoopDrivenResult = asyncForLoop(INPUT);
console.log("forLoopDrivenResult", forLoopDrivenResult);

waitForPromiseArrayAndLog(arrayMapDrivenResult);
waitForPromiseArrayAndLog(forLoopDrivenResult);
