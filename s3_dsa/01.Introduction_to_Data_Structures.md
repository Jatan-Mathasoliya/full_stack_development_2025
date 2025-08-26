# 🧠📚 Unit 1: Introduction to Data Structures

Data Structures are the foundation of efficient algorithms and software design. This unit introduces you to the basic building blocks of data organization, types, and performance metrics — with easy-to-follow C++ examples for each topic.

---

## 🚀🔎 Why Study Data Structures?

- **Efficient Problem Solving:** Organize and access data effectively.
- **Optimized Code:** Crucial for writing clean, optimized, and scalable programs.
- **Interview Ready:** Frequently asked topic in coding interviews and competitive programming.

---

## 🧩📋 Topics Covered

---

### 🔸 Introduction to Data Structures and Algorithms

A **data structure** organizes data so it can be used efficiently. An **algorithm** is a procedure to solve a problem using that data.

Example:
```cpp
// Simple Algorithm to find max in array
#include <iostream>
using namespace std;

int findMax(int arr[], int size) {
    int max = arr[0];
    for(int i = 1; i < size; i++) {
        if(arr[i] > max)
            max = arr[i];
    }
    return max;
}

int main() {
    int arr[] = {4, 7, 2, 9, 5};
    int size = 5;
    cout << "Max value: " << findMax(arr, size);
    return 0;
}
```

---

### 🔸 Data Types

#### 🧱 Primitive Data Types

Examples:
```cpp
int a = 10;
char ch = 'A';
float pi = 3.14;
bool flag = true;
```

#### 🏗️ Non-Primitive Data Types

Examples:
```cpp
int arr[3] = {1, 2, 3}; // Array
string name = "Sam";    // String
```

---

### 🔸 ⚙️ Performance Analysis and Measurement

#### Time and Space Complexity

Example:
```cpp
// O(n) Time & O(1) Space
#include <iostream>
using namespace std;

void printSum(int arr[], int size) {
    int sum = 0; // Constant space
    for (int i = 0; i < size; i++) {
        sum += arr[i]; // Linear time
    }
    cout << "Sum: " << sum;
}

int main() {
    int arr[] = {1, 2, 3, 4};
    printSum(arr, 4);
    return 0;
}
```

---

### 🔸 Types of Data Structures

#### 📐 Linear Data Structures

- Arrays
- Linked Lists
- Stacks
- Queues

#### 🌳 Non-Linear Data Structures

- Trees
- Graphs

---

### 🔸 🔤 Strings

#### 🧵 Introduction & Operations

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s1 = "Hello";
    string s2 = "World";
    
    // Concatenation
    string s3 = s1 + " " + s2;
    cout << "Concatenated: " << s3 << endl;

    // Comparison
    if (s1 == s2)
        cout << "Strings are equal\n";
    else
        cout << "Strings are not equal\n";

    // Substring
    cout << "Substring: " << s3.substr(0, 5) << endl;

    return 0;
}
```

---

### 🔸 📦 Arrays

#### 📘 Introduction

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[5] = {10, 20, 30, 40, 50};

    cout << "Array Elements: ";
    for(int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }

    return 0;
}
```

---

### 🔸 🎯 Pointers

#### 🔗 Introduction and Representation

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 42;
    int* ptr = &x;

    cout << "Value: " << x << endl;
    cout << "Address: " << &x << endl;
    cout << "Pointer Value: " << *ptr << endl;

    return 0;
}
```

---

### 🔸 📁 Records (Structures)

#### 🏷️ Example

```cpp
#include <iostream>
using namespace std;

struct Student {
    int id;
    string name;
    float marks;
};

int main() {
    Student s1 = {1, "Alice", 89.5};

    cout << "Student ID: " << s1.id << endl;
    cout << "Name: " << s1.name << endl;
    cout << "Marks: " << s1.marks << endl;

    return 0;
}
```

---

### 🔸 🔁 Recursion

#### 🔂 Factorial Example

```cpp
#include <iostream>
using namespace std;

int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}

int main() {
    int num = 5;
    cout << "Factorial of " << num << " is " << factorial(num);
    return 0;
}
```

---

#### 🗼 Tower of Hanoi Problem

```cpp
#include <iostream>
using namespace std;

void towerOfHanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        cout << "Move disk 1 from " << from << " to " << to << endl;
        return;
    }
    towerOfHanoi(n - 1, from, aux, to);
    cout << "Move disk " << n << " from " << from << " to " << to << endl;
    towerOfHanoi(n - 1, aux, to, from);
}

int main() {
    int n = 3; // Number of disks
    towerOfHanoi(n, 'A', 'C', 'B');
    return 0;
}
```

---

## 🧠 Practice Problems

| ✨ Problem | 🔗 Practice Link |
| :-- | :-- |
| ➗ Factorial Using Recursion | [Factorial](https://www.geeksforgeeks.org/program-for-factorial-of-a-number/) |
| 🧠 Tower of Hanoi | [Tower of Hanoi](https://www.geeksforgeeks.org/c-program-for-tower-of-hanoi/) |
| 📝 String Operations | [String Practice](https://www.geeksforgeeks.org/cpp-strings-set-1-introduction/) |
| 🧮 Array Manipulations | [Arrays](https://www.geeksforgeeks.org/arrays-in-c-cpp/) |
