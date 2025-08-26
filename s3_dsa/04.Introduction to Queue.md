# 📘 Introduction to Queue - Day 3

A **queue** is a linear data structure that works on the **First-In, First-Out (FIFO)** principle.

> 🛎️ *Think of a queue like a line at a ticket counter: the first person in line is served first.*

---

## 📌 Definition

- **Queue:** Collection with two operations:
  - ✏️ **Enqueue:** Add element at the rear.
  - 🗑️ **Dequeue:** Remove element from the front.
- **FIFO:** First element added is the first removed.

---

## ✅ 1️⃣ Simple Queue Using Array

```cpp
#include <iostream>
#define SIZE 5

class Queue {
    int arr[SIZE];
    int front, rear;
public:
    Queue() : front(-1), rear(-1) {}

    bool isFull() { return rear == SIZE - 1; }
    bool isEmpty() { return front == -1 || front > rear; }

    void enqueue(int value) {
        if (isFull()) { std::cout << "Queue Overflow\n"; return; }
        if (front == -1) front = 0;
        arr[++rear] = value;
    }

    void dequeue() {
        if (isEmpty()) { std::cout << "Queue Underflow\n"; return; }
        std::cout << "Removed: " << arr[front++] << std::endl;
    }

    void display() {
        if (isEmpty()) { std::cout << "Queue is empty\n"; return; }
        std::cout << "Queue: ";
        for (int i = front; i <= rear; ++i)
            std::cout << arr[i] << " ";
        std::cout << std::endl;
    }
};

int main() {
    Queue q;
    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    q.display();
    q.dequeue();
    q.display();
    return 0;
}
```

**📌 How It Works:** Adds at rear, removes from front, manages overflow/underflow.

---

## 🔄 2️⃣ Circular Queue Using Array

🔍 **Why Circular?** Reuses freed space using modulo for wrap-around.

```cpp
#include <iostream>
#define SIZE 5

class CircularQueue {
    int arr[SIZE];
    int front, rear;
public:
    CircularQueue() : front(-1), rear(-1) {}

    bool isFull() {
        return (front == 0 && rear == SIZE - 1) || ((rear + 1) % SIZE == front);
    }
    bool isEmpty() { return front == -1; }

    void enqueue(int value) {
        if (isFull()) { std::cout << "Queue Overflow\n"; return; }
        if (front == -1) front = 0;
        rear = (rear + 1) % SIZE;
        arr[rear] = value;
    }

    void dequeue() {
        if (isEmpty()) { std::cout << "Queue Underflow\n"; return; }
        std::cout << "Removed: " << arr[front] << std::endl;
        if (front == rear) front = rear = -1;
        else front = (front + 1) % SIZE;
    }

    void display() {
        if (isEmpty()) { std::cout << "Queue is empty\n"; return; }
        std::cout << "Queue: ";
        int i = front;
        while (true) {
            std::cout << arr[i] << " ";
            if (i == rear) break;
            i = (i + 1) % SIZE;
        }
        std::cout << std::endl;
    }
};

int main() {
    CircularQueue cq;
    cq.enqueue(10);
    cq.enqueue(20);
    cq.enqueue(30);
    cq.enqueue(40);
    cq.enqueue(50);
    cq.display();
    cq.dequeue();
    cq.enqueue(60);
    cq.display();
    return 0;
}
```

**📌 How It Works:** Uses wrap-around, efficiently utilizes space.

---

## 🔁 3️⃣ Deque Using Array

Deque allows insertion and deletion from both ends.

```cpp
#include <iostream>
#define SIZE 5

class Deque {
    int arr[SIZE];
    int front, rear;
public:
    Deque() : front(-1), rear(-1) {}

    bool isFull() {
        return (front == 0 && rear == SIZE - 1) || (front == rear + 1);
    }
    bool isEmpty() { return front == -1; }

    void insertFront(int value) {
        if (isFull()) { std::cout << "Deque Overflow\n"; return; }
        if (front == -1) front = rear = 0;
        else if (front == 0) front = SIZE - 1;
        else front--;
        arr[front] = value;
    }

    void insertRear(int value) {
        if (isFull()) { std::cout << "Deque Overflow\n"; return; }
        if (front == -1) front = rear = 0;
        else if (rear == SIZE - 1) rear = 0;
        else rear++;
        arr[rear] = value;
    }

    void deleteFront() {
        if (isEmpty()) { std::cout << "Deque Underflow\n"; return; }
        std::cout << "Removed from front: " << arr[front] << std::endl;
        if (front == rear) front = rear = -1;
        else if (front == SIZE - 1) front = 0;
        else front++;
    }

    void deleteRear() {
        if (isEmpty()) { std::cout << "Deque Underflow\n"; return; }
        std::cout << "Removed from rear: " << arr[rear] << std::endl;
        if (front == rear) front = rear = -1;
        else if (rear == 0) rear = SIZE - 1;
        else rear--;
    }

    void display() {
        if (isEmpty()) { std::cout << "Deque is empty\n"; return; }
        std::cout << "Deque: ";
        int i = front;
        while (true) {
            std::cout << arr[i] << " ";
            if (i == rear) break;
            i = (i + 1) % SIZE;
        }
        std::cout << std::endl;
    }
};

int main() {
    Deque dq;
    dq.insertRear(10);
    dq.insertRear(20);
    dq.insertFront(5);
    dq.display();
    dq.deleteFront();
    dq.deleteRear();
    dq.display();
    return 0;
}
```

**📌 Use Cases:**

- Queue ➡️ Print jobs, call systems.
- Circular Queue ➡️ CPU scheduling.
- Deque ➡️ Palindrome check, undo features.

---

## 🛠️ Using Queue with C++ STL

### 1️⃣ Include Header

```cpp
#include <queue>
```

### 2️⃣ Declare a Queue

```cpp
std::queue<int> q;
std::queue<std::string> s;
```

### 3️⃣ Basic Operations Table

| Operation | Description    | Example       |
| --------- | -------------- | ------------- |
| push(e)   | Add element    | `q.push(10);` |
| pop()     | Remove element | `q.pop();`    |
| front()   | Get front      | `q.front();`  |
| back()    | Get back       | `q.back();`   |
| size()    | Queue size     | `q.size();`   |
| empty()   | Is empty?      | `q.empty();`  |

### 4️⃣ Sample Code

```cpp
#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    q.push(10);
    q.push(20);
    q.push(30);
    cout << q.front() << " " << q.back() << endl;
    q.pop();
    cout << q.front() << endl;
    while (!q.empty()) {
        cout << q.front() << " ";
        q.pop();
    }
    return 0;
}
```

---

## 🧩 Practice Problems

| Problem                      | Link                                                                    |
| ---------------------------- | ----------------------------------------------------------------------- |
| Number of Recent Calls       | [LeetCode](https://leetcode.com/problems/number-of-recent-calls/)       |
| Implement Queue using Stacks | [LeetCode](https://leetcode.com/problems/implement-queue-using-stacks/) |
| Perfect Squares              | [LeetCode](https://leetcode.com/problems/perfect-squares/)              |
| Design Circular Queue        | [LeetCode](https://leetcode.com/problems/design-circular-queue/)        |

---


