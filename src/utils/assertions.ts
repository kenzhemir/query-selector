export function assertUnreachable(element: never) {
  return new Error(`Unreachable code: This value was not processed: ${element}`);
}
