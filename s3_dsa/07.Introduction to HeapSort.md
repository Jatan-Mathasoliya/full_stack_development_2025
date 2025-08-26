# 📘 Heap Sort - Data Structures & Algorithms

**Heap Sort** is an efficient, comparison-based, in-place sorting algorithm using the **heap data structure**.

> 🔄 *Think of Heap Sort as sorting by repeatedly removing the maximum (or minimum) element from a heap and rebuilding the heap until fully sorted.*

---

## 📌 Why Heap Sort?

✅ **Time Complexity:** `O(n log n)` in all cases.  
✅ **Space Complexity:** `O(1)` (in-place).  
✅ Uses the **heap property** for sorting efficiently.

---

## ⚙️ How Heap Sort Works

1️⃣ **Build a Max Heap** from the input data.  
2️⃣ Swap the root (maximum element) with the last element.  
3️⃣ Reduce the heap size by one and **heapify the root**.  
4️⃣ Repeat steps 2-3 until the heap size becomes 1.

This places the largest elements at the end of the array in sorted order.

---

## 🛠️ Heap Sort Implementation in C++

### 1️⃣ Heapify Function

```cpp
void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])
        largest = left;
    if (right < n && arr[right] > arr[largest])
        largest = right;

    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}
```

### 2️⃣ Heap Sort Function

```cpp
void heapSort(int arr[], int n) {
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    // Extract elements from heap one by one
    for (int i = n - 1; i >= 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}
```

### 3️⃣ Example Usage

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);

    heapSort(arr, n);

    cout << "Sorted array: ";
    for (int i = 0; i < n; ++i)
        cout << arr[i] << " ";
    cout << endl;

    return 0;
}
```

---

## 🚀 Applications of Heap Sort

- Sorting large datasets where **in-place sorting** is necessary.
- Situations requiring guaranteed `O(n log n)` sorting time.
- Teaching and understanding **heap operations practically**.

---

## ⚖️ Advantages vs Disadvantages

✅ **Advantages:**
- No extra memory required (in-place).
- Predictable time complexity (`O(n log n)`).
- Good for datasets that fit in memory and require in-place sorting.

❌ **Disadvantages:**
- Not stable (equal elements may not maintain their original order).
- Slower constants than Quick Sort in practice for most cases.

---

## 🧩 Practice Problems

| Problem                        | Link                                                                       |
|--------------------------------|----------------------------------------------------------------------------|
| Sort an Array                  | [LeetCode](https://leetcode.com/problems/sort-an-array/)                   |
| Kth Largest Element in Array   | [LeetCode](https://leetcode.com/problems/kth-largest-element-in-an-array/) |
| Merge K Sorted Lists           | [LeetCode](https://leetcode.com/problems/merge-k-sorted-lists/)            |
| Find Median from Data Stream   | [LeetCode](https://leetcode.com/problems/find-median-from-data-stream/)    |

---


