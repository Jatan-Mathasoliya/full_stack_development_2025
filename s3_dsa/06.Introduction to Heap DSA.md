# 📘 Heap - Data Structures

A **heap** is a complete binary tree that satisfies the **heap property**:

- **Max Heap:** Parent nodes are greater than or equal to their children.
- **Min Heap:** Parent nodes are less than or equal to their children.

> 🏗️ *Think of a heap as a tree where the maximum (or minimum) element is always at the top for efficient retrieval.*

---

## 📌 Why Learn Heap Before Priority Queue?

- A **priority queue is implemented efficiently using a heap.**
- Understanding **heap insertion, deletion, and heapify operations** builds a clear foundation for grasping priority queue internals.

---

## 🪴 Properties of Heap

- It is a **complete binary tree** (all levels filled except possibly the last).
- Supports **efficient insertion and removal of the root** (`O(log n)`).
- Can be stored efficiently in an **array**:
  - For a node at index `i`,
    - Left child: `2 * i + 1`
    - Right child: `2 * i + 2`
    - Parent: `(i - 1) / 2`

---

## ⚙️ Max Heap Implementation in C++

### 1️⃣ Structure and Heapify Functions

```cpp
#include <iostream>
#include <vector>
using namespace std;

class MaxHeap {
    vector<int> heap;

    void heapifyUp(int index) {
        while (index > 0 && heap[(index - 1) / 2] < heap[index]) {
            swap(heap[index], heap[(index - 1) / 2]);
            index = (index - 1) / 2;
        }
    }

    void heapifyDown(int index) {
        int largest = index;
        int left = 2 * index + 1;
        int right = 2 * index + 2;
        if (left < heap.size() && heap[left] > heap[largest])
            largest = left;
        if (right < heap.size() && heap[right] > heap[largest])
            largest = right;
        if (largest != index) {
            swap(heap[index], heap[largest]);
            heapifyDown(largest);
        }
    }

public:
    void insert(int val) {
        heap.push_back(val);
        heapifyUp(heap.size() - 1);
    }

    int extractMax() {
        if (heap.empty()) return -1;
        int maxVal = heap[0];
        heap[0] = heap.back();
        heap.pop_back();
        heapifyDown(0);
        return maxVal;
    }

    int getMax() {
        return heap.empty() ? -1 : heap[0];
    }

    bool isEmpty() {
        return heap.empty();
    }
};
```

### 2️⃣ Example Usage

```cpp
int main() {
    MaxHeap h;
    h.insert(10);
    h.insert(30);
    h.insert(20);
    h.insert(5);

    cout << "Max element: " << h.getMax() << endl; // 30

    while (!h.isEmpty()) {
        cout << h.extractMax() << " ";
    }
    // Output: 30 20 10 5
    return 0;
}
```

---

## ⚙️ Min Heap Implementation in C++

By modifying comparison conditions, you can implement a **Min Heap**:

- Parent nodes are smaller than their children.
- Useful in **Dijkstra's and Prim's algorithms**.

---

## 🚀 Applications of Heap

- **Implementing priority queues**
- **Heap Sort** (an in-place `O(n log n)` sorting algorithm)
- **Graph algorithms:** Dijkstra's and Prim's algorithms
- **Finding the k largest or smallest elements**
- **Median maintenance in data streams**

---

## 🧩 Practice Problems

| Problem                         | Link                                                                       |
| ------------------------------- | -------------------------------------------------------------------------- |
| Kth Largest Element in a Stream | [LeetCode](https://leetcode.com/problems/kth-largest-element-in-a-stream/) |
| Find Median from Data Stream    | [LeetCode](https://leetcode.com/problems/find-median-from-data-stream/)    |
| Heapsort                        | [LeetCode Article](https://leetcode.com/explore/learn/card/heap/)          |
| Merge K Sorted Lists            | [LeetCode](https://leetcode.com/problems/merge-k-sorted-lists/)            |

---


