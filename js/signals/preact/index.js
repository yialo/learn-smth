import { signal, computed, effect } from '@preact/signals-core';

console.log('== Preact signals');

const counter = signal(100);
console.log(`Count 1: ${counter.value}`);

const doubleCounter = computed(() => counter.value * 2);
console.log(`Double count: ${doubleCounter.value}`);

// Fires on init and on change of scoped signals
const dispose = effect(() => {
  console.log({
    counter: counter.value,
    doubleCounter: doubleCounter.value,
  });
});

counter.value = 200;
console.log(`Count 2: ${counter.value}`);

dispose();

counter.value += 50;
console.log(`Count 3: ${counter.value}`);

const num = signal(1000);

const total = computed(() => num.value + counter.value);
console.log(`Total: ${total.value}`);
