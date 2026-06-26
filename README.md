# Finding Two Missing Numbers in a Sorted Sequence

## Problem

Given a sorted sequence of numbers from `1` to `N` with exactly two missing values, find the missing numbers and estimate the computational complexity of the solution.

---

## Solution 1: Linear Scan

### Approach

Since the array is sorted, any missing number creates a gap between adjacent elements.

Algorithm:

1. Check boundary values (`1` and `N`).
2. Iterate through the array once.
3. Detect gaps between neighboring elements.
4. Collect missing numbers until two values are found.

### Complexity

- Time Complexity: **O(n)**
- Space Complexity: **O(1)**

### Implementation

```js
const findTwoMissingNumbersLinear = (arr = []) => {
  const missing = [];
  const lastNumber = arr.length + 2;

  if (arr[0] !== 1) missing.push(1);
  if (arr.at(-1) !== lastNumber) missing.push(lastNumber);

  if (missing.length === 2) return missing;

  for (let i = 0; i < arr.length; i++) {
    if (missing.length === 2) break;

    if (arr[i] + 1 !== arr[i + 1] && arr[i + 1]) {
      missing.push(arr[i] + 1);
    }

    if (arr[i] + 2 !== arr[i + 2] && arr[i + 2]) {
      missing.push(arr[i] + 2);
    }
  }

  return missing;
};
```

---

## Solution 2: Divide and Conquer

### Approach

This solution recursively splits the search range into smaller ranges.

For each range:

1. Compare the expected number of elements with the actual number of elements.
2. If both counts match, no numbers are missing in that range.
3. Otherwise, split the range into two halves and continue searching.
4. When the range contains only a single value, that value is missing.

### Complexity

Current implementation:

- Time Complexity: approximately **O(n log n)**
- Space Complexity: **O(log n)** due to recursion

### Implementation

```js
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
```

---

## Comparison

### Linear Scan

Advantages:

- Simple implementation
- Single pass through the array
- Low constant overhead
- Cache-friendly memory access pattern

Disadvantages:

- Requires scanning the entire array

### Divide and Conquer

Advantages:

- Demonstrates recursive range reduction strategy
- Can be improved further with binary search techniques

Disadvantages:

- More complex implementation
- Recursive overhead
- Additional scanning required during partitioning

---

## Conclusion

For this task, the linear scan solution is the most practical choice. It provides O(n) time complexity with O(1) extra space and has lower runtime overhead than the recursive divide-and-conquer implementation.
