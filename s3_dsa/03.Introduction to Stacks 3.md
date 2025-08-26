# 🔗✨ Introduction to Stacks

A stack is a **linear data structure** that operates on the Last-In, First-Out (**LIFO**) principle. Imagine a stack like a pile of plates: you add (push) and remove (pop) plates only from the **top**! 🍽️

## 🔗📝 Definition

- **Stack:** A collection that supports two main operations:
    - **Push:** Add an element to the top. 🟩
    - **Pop:** Remove an element from the top. 🟥
- **LIFO:** The last element added is the first one to be removed. 🔄
- **Top:** Pointer/reference to the *most recently added* element. 🎯


## 💻 C++ Stack Example (Array Implementation)

```cpp
#include <iostream>
using namespace std;

#define MAX 100  // Maximum size of stack

class Stack {
    int arr[MAX];
    int top;
public:
    Stack() { top = -1; }

    // Push operation
    void push(int value) {
        if (isFull()) {
            cout << "Stack Overflow\n";
            return;
        }
        arr[++top] = value;
    }

    // Pop operation
    void pop() {
        if (isEmpty()) {
            cout << "Stack Underflow\n";
            return;
        }
        top--;
    }

    // Peek operation
    int peek() {
        if (isEmpty()) {
            cout << "Stack is empty\n";
            return -1;
        }
        return arr[top];
    }

    // Check if stack is empty
    bool isEmpty() {
        return top == -1;
    }

    // Check if stack is full
    bool isFull() {
        return top == MAX - 1;
    }

    // Print stack contents
    void print() {
        cout << "Stack: ";
        for (int i = top; i >= 0; i--)
            cout << arr[i] << " ";
        cout << endl;
    }
};

int main() {
    Stack s;
    s.push(10);
    s.push(20);
    s.push(30);
    s.print();  // Output: Stack: 30 20 10
    cout << "Top element: " << s.peek() << endl; // Output: 30
    s.pop();
    s.print();  // Output: Stack: 20 10
    cout << "Is stack empty? " << (s.isEmpty() ? "Yes" : "No") << endl; // Output: No
    return 0;
}
```


---

## 🔗🤖 Using Stack in C++ STL

### 1. **Include the Stack Header**

```cpp
#include <stack>
```


### 2. **Declare a Stack**

```cpp
std::stack<int> s;             // Stack of integers
std::stack<std::string> names; // Stack of strings
```


### 3. **Common Stack Operations**

| 🛠️ Operation | ✨ Description | 💡 Example Code |
| :-- | :-- | :-- |
| `push(e)` | Add element `e` to the top of the stack | `s.push(10);` |
| `pop()` | Remove the top element (does not return the value) | `s.pop();` |
| `top()` | Access the top element (does not remove it) | `int x = s.top();` |
| `size()` | Get the number of elements in the stack | `int n = s.size();` |
| `empty()` | Check if the stack is empty (returns true/false) | `bool check = s.empty();` |

### 4. **Sample STL Stack Code**

```cpp
#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> s;

    // Push elements
    s.push(3);
    s.push(5);
    s.push(7);

    // Print and pop elements
    while (!s.empty()) {
        cout << "Top: " << s.top() << " | Size: " << s.size() << endl;
        s.pop();
    }

    return 0;
}
```


## ⭐️ Where Are Stacks Used?

- **Function/Recursion Calls:** Manages calls and returns in programming languages. 🧑‍💻
- **Undo Mechanisms:** Used for "undo" operations in editors. ⬅️
- **Balanced Parentheses:** Tracking in compilers and interpreters. () {} []
- **Backtracking Algorithms:** Mazes, puzzles, pathfinding. 🧩
- **Expression Evaluation:** Infix, postfix conversions/calculations. ➗


## 🎨 Visual: How Stack Works

| **Action** | **Initial** | **After Push(10)** | **After Push(20)** | **After Pop()** |
| :-- | --: | --: | --: | --: |
| Stack Content (Top) | *(empty)* | 10 | 20, 10 | 10 |

## 🔗📚 Practice Problems

| ✨ Problem | 🔗 LeetCode Link |
| :-- | :-- |
| 🧩 Valid Parentheses | [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) |
| 🟫 Min Stack | [Min Stack](https://leetcode.com/problems/min-stack/) |
| 🔜 Next Greater Element I | [Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/) |
| 🧭 Simplify Path | [Simplify Path](https://leetcode.com/problems/simplify-path/) |


