---
title: Selection Sort in JavaScript
date: 2020-07-23
tags:
- JavaScript
- Web development
layout: layout
---

This article is a part of the series of posts that will explain on how to implement the basic algorithms in JavaScript. It is nothing more than a challenge I set up for myself that would help me understand better the basic logic behind the most famous recipes used in Computer Science field.


This time let's have a closer look at **Selection Sort**, a sorting algorithm which has O(n2) time complexity. This means that it works better with shorter lists and each additional element makes it more inefficient.

The basic logic behind it is quite simple, we take an array and divide it into two parts: sorted subarray and unsorted subarray.  Sorted subarray is built increasingly from left to right at the beginning of the initial array, unsorted one occupies the rest of the list.

Let's see how does it work in an example. Let's take an array, something like `[2, 1, 3, 7]` would do.

```
const arr = [2, 1, 3, 7];
```
On the first run, we can assume that the first array element (`arr[0]`) is the lowest one (as we don't have any better guess) and put it into the sorted part of our array.

```

	[2,        1, 3, 7]
   
     ^			   ^
   sorted		unsorted

```

We then iterate through the rest of the array (unsorted part) and check if there's any element that holds a lower value. If we find one, we should swap the elements. In our example, we find a lower element directly after: its 1!  Let's swap them then:


```

// our array before the first iteration: 
	[2, 1, 3, 7]
        ^
	
	1 < 2 ?
		swap 2 and 1

// new result
	[1, 2, 3, 7]

```


But what if there's even lower value further down the road? For the sake of preventing our algorithm from skipping such number and effectively becoming useless, we need to continue our search.

```

	[1, 2, 3, 7]
	       ^

	3 < 1 ?
	   // not smaller, do not swap
	7 < 1 ? 
	   // not smaller, do not swap
```

OK, we're done with the first iteration. Now we need to repeat the same procedure for each number in the unsorted subarray:

```
	
	[1, 2,         3, 7]
   
     ^			   ^
   sorted		unsorted

	3 < 2 ?
	   // not smaller, do not swap
	7 < 2 ? 
	   // not smaller, do not swap
```

This time again, there was nothing to swap, let's move to the last run:

```
	[1, 2, 3,      7]
   
     ^			   ^
   sorted		unsorted

	7 < 3 ? 
	   // not smaller, do not swap
```

After all of the iterations, it seems that we have our result: 

```
[1, 2, 3, 7]
```


And here's how to implement **Selection Sort** in JavaScript:


```javascript

function selectionSort(arr) {
    /* Iterate through the array */
    for (var i = 0; i < arr.length - 1; i++) {
        /* At the beginning, assume that the lowest value is the first element */
        let min = i;

        /* Check if the element after arr[i] is smaller */
        for (let j = i + 1; j < arr.length; j++) {
            /* if arr[j] is smaller than arr[i], then it becomes the new minimum */
            if (arr[j] < arr[min]) {
                min = j;
            }
        }

        /* If min does not equal i, swap the elements */
        if (min !== i) {
            /* Create a temporary variable that will hold the value of arr[i] */
            let temp = arr[i];

            /* Put the value of arr[min] into arr[i] */
            arr[i] = arr[min];

            /* arr[min] receives the arr[i] value stored in temp */
            arr[min] = temp;
        }
    }

    return arr;
}

console.log(selectionSort([2, 1, 3, 7, 15, 126, 55, 32, 31, 4, 4]));

```

