export const slowdown = (delayMs: number) => {
  const startTime = performance.now();

  while (performance.now() - startTime < delayMs) {
    continue;
  }
};
