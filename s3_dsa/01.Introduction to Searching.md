# 📘 Linear Search & Binary Search - Data Structures & Algorithms

**Searching algorithms** allow you to **find elements efficiently in data structures**.

> 🔍 *Think of searching as finding a book in a library: Linear Search checks each book one by one, while Binary Search directly narrows down using sorted shelves.*

---

## 📌 Linear Search

**Linear Search** (Sequential Search) checks each element one by one until the desired element is found or the end is reached.

✅ **Works on unsorted and sorted data.**\
✅ **Time Complexity:** `O(n)`\
✅ **Space Complexity:** `O(1)`

### 🛠️ Linear Search in C++

```cpp
#include <iostream>
using namespace std;

int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key)
            return i; // returns index if found
    }
    return -1; // not found
}

int main() {
    int arr[] = {5, 2, 9, 1, 7};
    int n = sizeof(arr) / sizeof(arr[0]);
    int key = 9;
    int index = linearSearch(arr, n, key);

    if (index != -1)
        cout << "Element found at index " << index << endl;
    else
        cout << "Element not found" << endl;

    return 0;
}
```

---

## 📌 Binary Search

**Binary Search** efficiently finds an element in a **sorted array** by repeatedly dividing the search interval in half.

✅ **Requires sorted data.**\
✅ **Time Complexity:** `O(log n)`\
✅ **Space Complexity:** `O(1)` (iterative) or `O(log n)` (recursive)

---

## ⚙️ How Binary Search Works

1️⃣ Compare the middle element with the target value.\
2️⃣ If it matches, return its index.\
3️⃣ If the target is less, continue in the left half.\
4️⃣ If the target is more, continue in the right half.\
5️⃣ Repeat until the element is found or the interval is empty.

---

### 🛠️ Iterative Binary Search in C++

```cpp
#include <iostream>
using namespace std;

int binarySearch(int arr[], int n, int key) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == key)
            return mid;
        else if (arr[mid] < key)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return -1;
}

int main() {
    int arr[] = {1, 3, 5, 7, 9, 11};
    int n = sizeof(arr) / sizeof(arr[0]);
    int key = 7;
    int index = binarySearch(arr, n, key);

    if (index != -1)
        cout << "Element found at index " << index << endl;
    else
        cout << "Element not found" << endl;

    return 0;
}
```

---

### 🛠️ Recursive Binary Search in C++

```cpp
#include <iostream>
using namespace std;

int binarySearchRecursive(int arr[], int low, int high, int key) {
    if (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == key)
            return mid;
        else if (arr[mid] > key)
            return binarySearchRecursive(arr, low, mid - 1, key);
        else
            return binarySearchRecursive(arr, mid + 1, high, key);
    }
    return -1;
}

int main() {
    int arr[] = {2, 4, 6, 8, 10, 12};
    int n = sizeof(arr) / sizeof(arr[0]);
    int key = 8;
    int index = binarySearchRecursive(arr, 0, n - 1, key);

    if (index != -1)
        cout << "Element found at index " << index << endl;
    else
        cout << "Element not found" << endl;

    return 0;
}
```

---

## 🚀 Applications of Searching Algorithms

- Data retrieval in databases.
- Implementing efficient lookup features.
- Core of advanced algorithms like **Binary Search Trees (BSTs)**.
- Real-time systems requiring quick search capabilities.

---

## ⚖️ Linear Search vs Binary Search

| Feature          | Linear Search   | Binary Search                       |
| ---------------- | --------------- | ----------------------------------- |
| Data Requirement | Unsorted/Sorted | Sorted Only                         |
| Time Complexity  | O(n)            | O(log n)                            |
| Space Complexity | O(1)            | O(1) Iterative / O(log n) Recursive |
| Stability        | Stable          | Stable                              |
| Simplicity       | Very Simple     | Slightly Complex                    |

---

## 🧩 Practice Problems

| Problem                | Link                                                              |
| ---------------------- | ----------------------------------------------------------------- |
| Binary Search          | [LeetCode](https://leetcode.com/problems/binary-search/)          |
| Search Insert Position | [LeetCode](https://leetcode.com/problems/search-insert-position/) |
| First Bad Version      | [LeetCode](https://leetcode.com/problems/first-bad-version/)      |
| Find Peak Element      | [LeetCode](https://leetcode.com/problems/find-peak-element/)      |

---


