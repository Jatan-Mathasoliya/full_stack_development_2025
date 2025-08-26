# 📘 Priority Queue - Data Structures

A **priority queue** is an abstract data type where each element has a **priority**, and elements are served based on priority rather than the order they arrive.

> 🎯 *Think of it like a hospital emergency room: patients with higher urgency are treated first regardless of arrival time.*

---

## 📌 What is a Priority Queue?

- A **priority queue** stores elements with associated priorities.
- The element with the **highest priority is removed first**.
- If two elements have the same priority, they are served based on their order of insertion.

---

## 🛠️ Types of Priority Queues

- 🥇 **Max Priority Queue:** Highest priority (maximum value) removed first.
- 🥈 **Min Priority Queue:** Lowest priority (minimum value) removed first.
- Can be implemented using:
  - Arrays/Linked Lists (inefficient for dynamic priority adjustments)
  - **Heaps (Binary Heap, Fibonacci Heap, etc.)** for efficient insertion and removal.

---

## ⚙️ Priority Queue Implementation Using C++ STL

C++ STL provides the `priority_queue` container adapter for max-heaps by default.

### 1️⃣ Including Header

```cpp
#include <queue>
#include <vector>
#include <functional>
```

### 2️⃣ Basic Usage (Max Priority Queue)

```cpp
#include <iostream>
#include <queue>
using namespace std;

int main() {
    priority_queue<int> pq;
    pq.push(10);
    pq.push(30);
    pq.push(20);
    pq.push(5);

    cout << "Top element: " << pq.top() << endl; // 30

    while (!pq.empty()) {
        cout << pq.top() << " ";
        pq.pop();
    }
    // Output: 30 20 10 5
    return 0;
}
```

### 3️⃣ Min Priority Queue

Use `priority_queue<int, vector<int>, greater<int>>` for min priority queue.

```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
    priority_queue<int, vector<int>, greater<int>> pq;
    pq.push(10);
    pq.push(30);
    pq.push(20);
    pq.push(5);

    cout << "Top element: " << pq.top() << endl; // 5

    while (!pq.empty()) {
        cout << pq.top() << " ";
        pq.pop();
    }
    // Output: 5 10 20 30
    return 0;
}
```

---

## ⚙️ Priority Queue Implementation Using Binary Heap

A **binary heap** is the most common implementation for a priority queue:

### 1️⃣ Max Heap Insert and Extract Max

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

int main() {
    MaxHeap pq;
    pq.insert(10);
    pq.insert(30);
    pq.insert(20);
    pq.insert(5);

    cout << "Max element: " << pq.getMax() << endl; // 30

    while (!pq.isEmpty()) {
        cout << pq.extractMax() << " ";
    }
    // Output: 30 20 10 5
    return 0;
}
```

---

## 🚀 Applications of Priority Queue

- **CPU and task scheduling**
- **Graph algorithms:** Dijkstra's shortest path, Prim's MST
- **Data compression:** Huffman coding
- **Load balancing**
- **Bandwidth management in networking**

---

## 🧩 Practice Problems

| Problem                                     | Link                                                                       |
|---------------------------------------------|----------------------------------------------------------------------------|
| Kth Largest Element in an Array             | [LeetCode](https://leetcode.com/problems/kth-largest-element-in-an-array/) |
| Merge K Sorted Lists                        | [LeetCode](https://leetcode.com/problems/merge-k-sorted-lists/)            |
| Top K Frequent Elements                     | [LeetCode](https://leetcode.com/problems/top-k-frequent-elements/)         |
| Sliding Window Maximum                      | [LeetCode](https://leetcode.com/problems/sliding-window-maximum/)          |

---


