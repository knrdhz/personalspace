---
title: Bubble Sort in JavaScript
date: 2020-03-05
tags: 
	- webdev
layout: layout
---

This article is a part of the series of posts that will explain on how to implement the basic algorithms in JavaScript. It is nothing more than a challenge I set up for myself that would help me understand better the basic login behind the most famous recipes used in Computer Science field. 

Bubble sort's essential goal is to take a list of unordered elements and return a list of a sorted elements. At the very core of the algorithm there are three basic operations:

1. Stepping through a list
2. Comparing adjacent elements
3. Swapping them if necessary (they are in wrong order).

In practice we can think of an array of few numbers, for instance:

```
*1, 3, 2, 4*
```
Bubble sort would take this function and step through it taking two adjacent elements:

```
*1, 3, 2, 4*
1, 3
```
Everything seems to be good, 1 is indeed smaller than 3, we should leave those numbers as they are and move to the next pair.

```
*1, 3, 2, 4*
3, 2
```
This is where the algorithm detects an unsorted pair. It swaps the items and we're moving on to the following pair of numbers:

```
*1, 2, 3, 4*
3, 4
```

Here again everything seems to be right. However, the algorithm noticed that it had to swap at least one pair in this run, therefore it needs to run again to check whether there are still some unsorted numbers.

```
*1, 2, 3, 4*
1, 2 <- 1st pair is sorted
2, 3 <- 2nd pair is sorted
3, 4 <- 3rd pair is sorted
```

Only once the full run through all the elements of an array is complete and no need for swapping the adjacent numbers was signalled, the bubble sort is complete.

Here's the implementation of this very algorithm in pure JavaScript

```javascript
let arr = [5, 3, 12, 1, 53];
let swap; // variable indicating whether the array is sorted

function bubbleSort(a) {
  /* 1. Step through an array as long as it's not sorted */
  do {  
    swap = false;
    for (let i = 0; i <= a.length; i++) {
      /* 2. Pick up two adjacent elements and check if they need to be swapped */
      if (a[i] > a[i+1]) {
        let tmp = a[i];
        a[i] = a[i+1];
        a[i+1] = tmp;
        /* Not a perfect run - some elements are to be sill sorted*/
        swap = true;
      }
    }
  } while (swap);
  return a;
}

bubbleSort(arr);
```

And that's pretty much it.

Please mind the fact that **bubble sort** is quite a simple algorithm and as you probably have already noticed, it's not the most efficient one. It has a **Big O** complexity notation of its O(n2), which means quadratic complexity. In practice the complexity doubles every time we increase the input by one. It is therefore not recommended to use it in real-life projects (except for a very small operations like sorting the list of two elements etc.). 
