const arr = Array.from({ length: 100_000_000 }, (_, i) => i + 1).filter((n) => n !== 1 && n !== 100_000_000);

// O(n) time complexity
const findTwoMissingNumbersLinear = (arr = []) => {
  const missing = [];
  const lastNumber = arr.length + 2;

  if (arr[0] !== 1) missing.push(1);
  if (arr.at(-1) !== lastNumber) missing.push(lastNumber);

  if (missing.length === 2) return missing;

  for (let i = 0; i < arr.length; i++) {
    if (missing.length === 2) break;

    if (arr[i] + 1 !== arr[i + 1] && arr[i + 1]) missing.push(arr[i] + 1);
    if (arr[i] + 2 !== arr[i + 2] && arr[i + 2]) missing.push(arr[i] + 2);
  }

  return missing;
};

console.time('findTwoMissingNumbersLinear');
console.log(findTwoMissingNumbersLinear(arr));
console.timeEnd('findTwoMissingNumbersLinear');

// Recursive divide-and-conquer approach.
// In the current implementation, each split requires a linear scan to find the partition point, resulting in approximately O(n log n) complexity.
const findTwoMissingNumbersRecursive = (arr = []) => {
  const missing = [];
  const lastNumber = arr.length + 2;

  const search = (left, right, start, end) => {
    if (missing.length === 2) return;

    const current = right - left + 1;
    const expected = end - start + 1;

    if (expected === current) return;

    if (start === end) {
      missing.push(start);
      return;
    }

    const mid = Math.floor((start + end) / 2);

    let idx = left;

    while (idx <= right && arr[idx] <= mid) {
      idx++;
    }

    search(left, idx - 1, start, mid);

    search(idx, right, mid + 1, end);
  };

  search(0, arr.length - 1, 1, lastNumber);

  return missing;
};

console.time('findTwoMissingNumbersRecursive');
console.log(findTwoMissingNumbersRecursive(arr));
console.timeEnd('findTwoMissingNumbersRecursive');

// Binary search approach has higher constant overhead due to recursion, additional stack usage,
// and extra array scanning in each split step.

// Even though both solutions are O(n)-ish in practice, the first approach is more cache-friendly
// and has lower CPU overhead because it is a single linear pass without recursion or branching
// complexity.
