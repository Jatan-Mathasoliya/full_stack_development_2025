# 📘 Sorting Algorithms - Data Structures & Algorithms

**Sorting algorithms** arrange data in a specific order (ascending/descending) for efficient access and processing.

> 🧩 *Think of sorting as organizing your books or files so you can find what you need quickly.*

---

## 📌 Why Sorting?

✅ Helps in **efficient searching**.\
✅ Makes data easier to understand and visualize.\
✅ Crucial for optimizing **database queries, algorithms, and system design**.

---

## 🗂️ Types of Sorting Algorithms

### 1️⃣ Bubble Sort

### 2️⃣ Selection Sort

### 3️⃣ Insertion Sort

### 4️⃣ Merge Sort

### 5️⃣ Quick Sort

### 6️⃣ Heap Sort

### 7️⃣ Counting Sort

### 8️⃣ Radix Sort

---

## 1️⃣ Bubble Sort

**Bubble Sort** repeatedly swaps adjacent elements if they are in the wrong order.

✅ **Time Complexity:** `O(n^2)`\
✅ **Space Complexity:** `O(1)`

```cpp
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}
```

---

## 2️⃣ Selection Sort

Selects the **minimum element and places it at the beginning**.

✅ **Time Complexity:** `O(n^2)`\
✅ **Space Complexity:** `O(1)`

```cpp
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        swap(arr[i], arr[minIndex]);
    }
}
```

---

## 3️⃣ Insertion Sort

Builds the sorted array one element at a time by **inserting each element at its correct position**.

✅ **Time Complexity:** `O(n^2)`\
✅ **Space Complexity:** `O(1)`

```cpp
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
```

---

## 4️⃣ Merge Sort

Uses **Divide and Conquer** to divide the array, sort each half, and merge them.

✅ **Time Complexity:** `O(n log n)`\
✅ **Space Complexity:** `O(n)`

```cpp
void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}
```

---

## 5️⃣ Quick Sort

Uses **Divide and Conquer** and **partitioning** around a pivot.

✅ **Average Time Complexity:** `O(n log n)`\
✅ **Worst Case:** `O(n^2)`\
✅ **Space Complexity:** `O(log n)` (due to recursion)

```cpp
int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
```

---

## 6️⃣ Heap Sort

Uses the **heap data structure** to sort elements.

✅ **Time Complexity:** `O(n log n)`\
✅ **Space Complexity:** `O(1)`

See your **Heap Sort README** for complete implementation.

---

## 7️⃣ Counting Sort

A **non-comparison-based sorting algorithm** ideal for small ranges.

✅ **Time Complexity:** `O(n + k)` where `k` is the range of input.\
✅ **Space Complexity:** `O(k)`

```cpp
void countingSort(int arr[], int n) {
    int maxVal = *max_element(arr, arr + n);
    int count[maxVal + 1] = {0};
    for (int i = 0; i < n; i++) count[arr[i]]++;
    int index = 0;
    for (int i = 0; i <= maxVal; i++) {
        while (count[i]-- > 0) {
            arr[index++] = i;
        }
    }
}
```

---

## 8️⃣ Radix Sort

Sorts numbers digit by digit using Counting Sort as a subroutine.

✅ **Time Complexity:** `O(nk)` where `k` is the number of digits.\
✅ **Space Complexity:** `O(n + k)`

```cpp
int getMax(int arr[], int n) {
    int mx = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > mx)
            mx = arr[i];
    return mx;
}

void countSort(int arr[], int n, int exp) {
    int output[n];
    int count[10] = {0};
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}

void radixSort(int arr[], int n) {
    int m = getMax(arr, n);
    for (int exp = 1; m / exp > 0; exp *= 10)
        countSort(arr, n, exp);
}
```

---

## 🚀 Applications of Sorting Algorithms

- Optimizing search operations.
- Data analysis and visualization.
- Preprocessing for other algorithms (like binary search, merge operations).
- Memory and file system organization.

---

## 🧩 Practice Problems

| Problem                 | Link                                                               |
| ----------------------- | ------------------------------------------------------------------ |
| Sort an Array           | [LeetCode](https://leetcode.com/problems/sort-an-array/)           |
| Merge Intervals         | [LeetCode](https://leetcode.com/problems/merge-intervals/)         |
| Sort Colors             | [LeetCode](https://leetcode.com/problems/sort-colors/)             |
| Insertion Sort List     | [LeetCode](https://leetcode.com/problems/insertion-sort-list/)     |
| Top K Frequent Elements | [LeetCode](https://leetcode.com/problems/top-k-frequent-elements/) |

---


