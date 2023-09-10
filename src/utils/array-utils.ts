export function isSubarray<T>(subarray: T[], array: T[]): boolean {
  // Use the every() method to check if all elements from arrayB are present in arrayA
  return subarray.every((subarrayElement) => array.includes(subarrayElement));
}
