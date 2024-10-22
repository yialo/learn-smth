console.log("1");

setTimeout(() => {
  console.log("2");
});

Promise.resolve(3).then(console.log);

console.log("4");

setTimeout(() => {
  console.log("5");
}, 0);

console.log("6");

// freezes runtime when called
const promiseFn = () => {
  console.log("fn");
  return Promise.resolve().then(promiseFn);
};

let timerFnCalled = false;

// doesn't freeze runtime when called
const timerFn = () => {
  console.log("fn");
  setTimeout(timerFn);

  if (!timerFnCalled) {
    setTimeout(() => {
      console.log("INSIDE");
    });
    timerFnCalled = true;
  }
};
