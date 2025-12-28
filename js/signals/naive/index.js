'use strict';

const signal = (initialValue) => {
  const box = { value: initialValue };

  const getter = () => {
    if (typeof box.value === 'function') return box.value();
    return box.value;
  };

  getter.set = (newValue) => {
    box.value = newValue;
    return box.value;
  };
  getter.update = (callback) => {
    box.value = callback(box.value);
    return box.value;
  };

  return getter;
};

const computed = (compute) => signal(compute);

{
  console.log('== Naive signals');

  const counter = signal(100);
  console.log(`Count 1: ${counter()}`);

  counter.set(200);
  console.log(`Count 2: ${counter()}`);

  counter.update((prev) => prev + 50);
  console.log(`Count 3: ${counter()}`);

  const num = signal(1000);

  const total = computed(() => num() + counter());
  console.log(`Total: ${total()}`);
}
