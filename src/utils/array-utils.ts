export function isSubarray<T>(subarray: T[], array: T[]): boolean {
  return subarray.every((subarrayElement) => array.includes(subarrayElement));
}
