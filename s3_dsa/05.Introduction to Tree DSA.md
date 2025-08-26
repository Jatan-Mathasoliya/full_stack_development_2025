# 📘 Introduction to Trees - Day 4, 5 & 6

A **tree** is a hierarchical, non-linear data structure made of nodes connected by edges.

> 🌳 *Think of it like an organization chart or file system, branching out from a single root.*

---

## 📌 What is a Binary Tree?

A **binary tree** is a tree where each node has at most **two children (left and right)**.

- **Node:** Basic unit with data and links.
- **Root:** Topmost node.
- **Leaf:** Node with no children.
- **Parent/Child:** Relations between nodes.
- **Subtree:** Node with its descendants.
- **Height:** Longest path from root to a leaf.
- **Depth:** Distance from root to node.

---

## 🪴 Types of Binary Trees

- 🌱 **Full Binary Tree:** 0 or 2 children.
- 🌿 **Complete Binary Tree:** All levels full except possibly last.
- 🌳 **Perfect Binary Tree:** All internal nodes have 2 children, leaves on the same level.
- 🌲 **Balanced Binary Tree:** Heights of subtrees differ by at most 1.

---

## ⚙️ Representation in C++

```cpp
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int value) : data(value), left(nullptr), right(nullptr) {}
};
```

Creating a tree:

```cpp
Node* root = new Node(1);
root->left = new Node(2);
root->right = new Node(3);
root->left->left = new Node(4);
root->left->right = new Node(5);
```

---

## 🔄 Iterative Traversals

### 1️⃣ Level Order (BFS)

```cpp
#include <queue>
void levelOrder(Node* root) {
    if (!root) return;
    queue<Node*> q;
    q.push(root);
    while (!q.empty()) {
        Node* curr = q.front(); q.pop();
        cout << curr->data << " ";
        if (curr->left) q.push(curr->left);
        if (curr->right) q.push(curr->right);
    }
}
```

### 2️⃣ Iterative Inorder

```cpp
#include <stack>
void inorder(Node* root) {
    stack<Node*> st;
    Node* curr = root;
    while (curr || !st.empty()) {
        while (curr) {
            st.push(curr);
            curr = curr->left;
        }
        curr = st.top(); st.pop();
        cout << curr->data << " ";
        curr = curr->right;
    }
}
```

### 3️⃣ Iterative Preorder

```cpp
void preorder(Node* root) {
    if (!root) return;
    stack<Node*> st;
    st.push(root);
    while (!st.empty()) {
        Node* curr = st.top(); st.pop();
        cout << curr->data << " ";
        if (curr->right) st.push(curr->right);
        if (curr->left) st.push(curr->left);
    }
}
```

### 4️⃣ Iterative Postorder (using two stacks)

```cpp
void postorder(Node* root) {
    if (!root) return;
    stack<Node*> st1, st2;
    st1.push(root);
    while (!st1.empty()) {
        Node* curr = st1.top(); st1.pop();
        st2.push(curr);
        if (curr->left) st1.push(curr->left);
        if (curr->right) st1.push(curr->right);
    }
    while (!st2.empty()) {
        cout << st2.top()->data << " ";
        st2.pop();
    }
}
```

**📌 Use Cases:**

- File systems, organization charts.
- Efficient search (BSTs).
- Game trees, network routing.

---

## 🌲 Binary Search Trees (BST)

In a **BST**, the left child has values less than the parent, the right child has values greater.

### 🛠️ BST Node Structure

```cpp
struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int val) : data(val), left(nullptr), right(nullptr) {}
};
```

### 1️⃣ Insertion

```cpp
Node* insert(Node* root, int key) {
    if (!root) return new Node(key);
    if (key < root->data)
        root->left = insert(root->left, key);
    else if (key > root->data)
        root->right = insert(root->right, key);
    return root;
}
```

### 2️⃣ Search

```cpp
Node* search(Node* root, int key) {
    if (!root || root->data == key) return root;
    if (key < root->data) return search(root->left, key);
    else return search(root->right, key);
}
```

### 3️⃣ Deletion

```cpp
Node* minValueNode(Node* node) {
    Node* current = node;
    while (current && current->left) current = current->left;
    return current;
}

Node* deleteNode(Node* root, int key) {
    if (!root) return root;
    if (key < root->data)
        root->left = deleteNode(root->left, key);
    else if (key > root->data)
        root->right = deleteNode(root->right, key);
    else {
        if (!root->left) {
            Node* temp = root->right;
            delete root;
            return temp;
        } else if (!root->right) {
            Node* temp = root->left;
            delete root;
            return temp;
        }
        Node* temp = minValueNode(root->right);
        root->data = temp->data;
        root->right = deleteNode(root->right, temp->data);
    }
    return root;
}
```

### 4️⃣ Min and Max

```cpp
Node* findMin(Node* root) {
    while (root && root->left) root = root->left;
    return root;
}

Node* findMax(Node* root) {
    while (root && root->right) root = root->right;
    return root;
}
```

### 5️⃣ Predecessor and Successor

```cpp
Node* successor(Node* root) { return findMin(root->right); }
Node* predecessor(Node* root) { return findMax(root->left); }
```

### 🚀 Example Usage

```cpp
int main() {
    Node* root = nullptr;
    root = insert(root, 8);
    root = insert(root, 3);
    root = insert(root, 10);
    root = insert(root, 1);
    root = insert(root, 6);
    root = insert(root, 14);
    root = insert(root, 4);
    root = insert(root, 7);

    Node* found = search(root, 6);
    root = deleteNode(root, 10);
    Node* minNode = findMin(root);
    Node* maxNode = findMax(root);
    Node* suc = successor(root->left);
    Node* pred = predecessor(root->right);

    return 0;
}
```

**📌 Use Cases:**

- Database indexing.
- Sorted data retrieval.
- Memory management.

---

## 🧩 Practice Problems

| Problem                          | Link                                                                         |
| -------------------------------- | ---------------------------------------------------------------------------- |
| Level Order Traversal            | [LeetCode](https://leetcode.com/problems/binary-tree-level-order-traversal/) |
| Height of Binary Tree            | [LeetCode](https://leetcode.com/problems/maximum-depth-of-binary-tree/)      |
| Diameter of Binary Tree          | [LeetCode](https://leetcode.com/problems/diameter-of-binary-tree/)           |
| Invert Binary Tree (Mirror Tree) | [LeetCode](https://leetcode.com/problems/invert-binary-tree/)                |

---


