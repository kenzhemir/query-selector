export function curry<T, A extends unknown[], B extends unknown[], R>(
  fn: (this: T | undefined, ...args: [...A, ...B]) => R,
  ...args: A
): (...args: B) => R {
  return fn.bind(undefined, ...args);
}
