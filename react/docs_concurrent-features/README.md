# React docs: Concurrent-features

## Transitions

useTransition() and useDeferredValue() schedule additional render.

Heavy components that receives deferred value should be memoized, otherwise it will slow down rendering on each state update anyway.

Slowing down by heavy DOM (with expensive layout/reflow task) can be optimized via transitions; heavy synchronous calculations inside component body can't.
