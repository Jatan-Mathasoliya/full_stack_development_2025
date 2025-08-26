# 🔗✨ Introduction to Linked Lists

A linked list is a fundamental data structure in computer science that stores a sequence of elements, called nodes, where each node contains data and a reference (or pointer) to the next node in the sequence. Unlike arrays, linked lists do not require elements to be stored in contiguous memory locations, making them highly flexible for dynamic memory allocation and efficient for operations like insertion and deletion.

## 🔗🚀 Why Use Linked Lists?

- **Dynamic Size:** Linked lists can grow or shrink at runtime, perfect for situations where the number of elements is unknown in advance.
- **Efficient Insertions/Deletions:** Adding or removing elements does not require shifting, as in arrays—only pointers are updated.
- **Flexible Memory Usage:** Nodes are allocated as needed, reducing memory waste.


## 🔗📝 Definition

A linked list is a linear data structure with each element (node) comprising:

- **Data:** The value stored in the node.
- **Pointer(s):** Reference(s) to the next (and/or previous) node(s) in the list.

**Types:**

- **Singly Linked List:** Each node points to the next node.
- **Doubly Linked List:** Each node points to both the next and previous nodes.
- **Circular Linked List:** The last node points back to the first, forming a loop.


## 💻 C++ Implementation

### 1. Singly Linked List 👉

```cpp
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

void insertAtHead(Node*& head, int value) {
    Node* newNode = new Node{value, head};
    head = newNode;
}

void printList(Node* head) {
    while (head != nullptr) {
        cout << head->data << " -> ";
        head = head->next;
    }
    cout << "NULL\n";
}

int main() {
    Node* head = nullptr;
    insertAtHead(head, 3);
    insertAtHead(head, 2);
    insertAtHead(head, 1);
    printList(head);
    return 0;
}
```


### 2. Doubly Linked List 🔁

```cpp
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* prev;
    Node* next;
};

void insertAtHead(Node*& head, int value) {
    Node* newNode = new Node{value, nullptr, head};
    if (head != nullptr) head->prev = newNode;
    head = newNode;
}

void printList(Node* head) {
    while (head != nullptr) {
        cout << head->data << " <-> ";
        head = head->next;
    }
    cout << "NULL\n";
}

int main() {
    Node* head = nullptr;
    insertAtHead(head, 3);
    insertAtHead(head, 2);
    insertAtHead(head, 1);
    printList(head);
    return 0;
}
```


### 3. Circular Linked List 🔄

```cpp
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

void insert(Node*& head, int value) {
    Node* newNode = new Node{value, nullptr};
    if (!head) {
        head = newNode;
        newNode->next = head;
        return;
    }
    Node* temp = head;
    while (temp->next != head)
        temp = temp->next;
    temp->next = newNode;
    newNode->next = head;
}

void printList(Node* head) {
    if (!head) return;
    Node* temp = head;
    do {
        cout << temp->data << " -> ";
        temp = temp->next;
    } while (temp != head);
    cout << "(head)\n";
}

int main() {
    Node* head = nullptr;
    insert(head, 1);
    insert(head, 2);
    insert(head, 3);
    printList(head);
    return 0;
}
```


## 🌟 Use Cases of Linked Lists

- **Implementation of Stacks and Queues:** Backbone for stacking structures.
- **Dynamic Memory Allocation:** Used in memory management systems (e.g., free block lists).
- **Graph Representations:** Adjacency lists in graph algorithms.
- **Navigation Systems:** Previous/next for browsers, music players, and image viewers.
- **Polynomial Arithmetic:** Storing/manipulating polynomials and large numbers.


## 🧠 Memory Model

- **Non-Contiguous Storage:** Each node is individually allocated in memory.
- **Pointers Link Nodes:** Each node uses pointers to form the chain.
- **Head Pointer:** Allows access to the first node.
- **Efficient Insert/Delete:** Inserting or deleting only requires pointer updates, not shifting of elements.


# 🔩 Basic Operations: Insertion, Deletion, Traversal, Searching

## 1. Traversal 🚶

- **Definition:** Visiting every node in the linked list, often to process or display its data.
- **How it works:** Start at the head and follow next pointers until NULL.

```cpp
void printList(Node* head) {
    Node* temp = head;
    while (temp != nullptr) {
        cout << temp->data << " -> ";
        temp = temp->next;
    }
    cout << "NULL\n";
}
```

*Use Case: Printing all elements, summing values, or searching for a value.*

## 2. Insertion ➕

- **Definition:** Add a node to the linked list—at the beginning, end, or a given position.


### Insert at the Beginning

```cpp
void insertAtHead(Node*& head, int value) {
    Node* newNode = new Node{value, head};
    head = newNode;
}
```


### Insert at the End

```cpp
void insertAtEnd(Node*& head, int value) {
    Node* newNode = new Node{value, nullptr};
    if (!head) {
        head = newNode;
        return;
    }
    Node* temp = head;
    while (temp->next) temp = temp->next;
    temp->next = newNode;
}
```


### Insert After a Given Node

```cpp
void insertAfter(Node* prev, int value) {
    if (!prev) return;
    Node* newNode = new Node{value, prev->next};
    prev->next = newNode;
}
```

*Use Case: Adding new data, such as appending actions to a history log.*

## 3. Deletion ❌

- **Definition:** Remove a node from the list—by position, value, or from start/end.


### Delete by Value

```cpp
void deleteByValue(Node*& head, int value) {
    if (!head) return;
    if (head->data == value) {
        Node* temp = head;
        head = head->next;
        delete temp;
        return;
    }
    Node* temp = head;
    while (temp->next && temp->next->data != value)
        temp = temp->next;
    if (temp->next) {
        Node* toDelete = temp->next;
        temp->next = temp->next->next;
        delete toDelete;
    }
}
```

*Use Case: Removing a completed task from a list.*

## 4. Searching 🔍

- **Definition:** Find if a node with a certain value exists.

```cpp
bool search(Node* head, int key) {
    Node* temp = head;
    while (temp) {
        if (temp->data == key) return true;
        temp = temp->next;
    }
    return false;
}
```

*Use Case: Checking if a user is present in a session list.*

## 📝 Practice Problems

Below is a clean, responsive markdown table of common linked list problems. Each includes a relevant emoji for clarity and appeal.


| ✨ Problem | 🔗 LeetCode Link |
| :-- | :-- |
| ➡️ Reverse Linked List | [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) |
| 🔄 Detect Cycle in Linked List | [Detect Cycle in Linked List](https://leetcode.com/problems/linked-list-cycle/) |
| 🔎 Find Middle of Linked List | [Find Middle of Linked List](https://leetcode.com/problems/middle-of-the-linked-list/) |
| 🪄 Merge Two Sorted Lists | [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) |

