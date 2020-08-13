---
title: Quick Sort in JavaScript
date: 2020-08-13
tags:
- JavaScript
- Web development
layout: layout
---

This article is a part of the series of posts that will explain on how to implement the basic algorithms in JavaScript. It is nothing more than a challenge I set up for myself that would help me understand better the basic logic behind the most famous recipes used in Computer Science field.


Today I'm going to be looking at one of the most famous algorithms out there -Quick Sort. It rose up to its popularity as a recurring theme of various interview stories, actually it has became a meme in certain circles (as in "Youngsters nowadays would keenly post their pictures on Instagram, but when you ask them to present a simple quick sort nobody answers").

So let's get to it. As always with sorting algorithms, we start off with some random array and a task: you need to put all the elements in order:

```bash
| 9 | 7 | 3 | 1 | 4 | 2 | 6 | 5 | 8 | 19|
```
*Quick Sort* method involves a concept of a pivot: a randomly picked element of an array that is to be sorted. In our example, let's pick (as said, completely randomly!) the number **4** as it's in the middle, more or less.

Then we need to walk through the array from both sides - left to right and right to left and swap the elements which are out of order. What's our 'order' in this context? Every element less than 4 should be before every element greater than 4. Easy!

```bash
higher than 4                 higher than 4
  |             pivot                 |
  |               |                   |
|(9)| 7 | 3 | 1 |[4]| 2 | 6 | 5 | 8 |(19)|
```

Well, not in this case: we start off with two elements that should be on the right-hand side of our pivot. What do we do in this situation? We leave 19 where it is at the moment and look for an element that could be swapped with 9:

```bash
higher than 4       we can swap this!
  |                   |
  |                   |   x   x   x   x
|(9)| 7 | 3 | 1 |[4]|(2)| 6 | 5 | 8 | 19|
```

After burning through 8, 5 and 6 we finally find 2 which can be swapped with 9! Here's our array now:

```bash
| 2 | 7 | 3 | 1 |[4]| 9 | 6 | 5 | 8 | 19|
```
We continue with our search now for the elements that should be swapped.

```bash
    can we swap it?
      |          yes we can!           
	  |           |
| 2 | 7 | 3 | 1 |[4]| 9 | 6 | 5 | 8 | 19|

```
And in the last move we leave 3 and 1 as they are: both are smaller than 4, so there's no need to swap them.

```bash
      can't swap them
          |   |
          |   |
| 2 |[4]| 3 | 1 | 7 | 9 | 6 | 5 | 8 | 19|
```
We end up with an array divided in two parts: elements smaller (or equal to) and higher than the pivot:

```bash
smaller         |            higher
| 2 |[4]| 3 | 1 | 7 | 9 | 6 | 5 | 8 | 19|
                |
```

Now we need to perform exactly the same quick sort algorithm on each of those parts. We pick up a random element that will serve as a pivot and continue swapping the elements. Let's look at the example of the 'smaller than 4' part:
```bash
		 swap   swap
        x   |       |
1:	| 2 | 4 |[3]| 1 |

2:	| 2 | 1 |[3]| 4 |

        x <= 3  | x > 3
3:	| 2 | 1 | 3 | 4 |
				|
```

In just three steps we came to the situation where the subarray is divided into two smaller arrays. Let's finish the job for the sake of completeness, knowing that the 'higher than 3' array has only one element: it's already sorted:
```bash
1:	|[2]| 1 | 3 |

	swap swap
	    |   |   x
2:	|[2]| 1 | 3 |

3:	| 1 | 2 | 3 |
```

As we can see, our list becomes more and more sorted. If we recursively repeat those steps, we will eventually get to the mini-arrays of size of 1 which are going to be in perfect order. We just need to reassemble them into the original-size array and voilà - our job here is done.

Now, how does this method look like when we implement it in JavaScript?

```javascript
const arr = [9, 7, 3, 1, 4, 2, 6, 5, 8, 19];

function quickSort(arr) {
    /* Array has one element, nothing to do here */
    if (arr.length <= 1) {
        return arr;
    }

    /* Define new variables that will serve us as left, right and output arrays */
    var left = [];
    var right = [];
    var outputArray = [];

    /* Let's chose the last element of our array as pivot */
    var pivot = arr.pop();

    /* Iterate through an array to see if elements are lower or higher than a pivot */
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] <= pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    /* Use recursion to sort left and right arrays - they will become smaller
     * and smaller and finally get contatenated in outputArray */
    return outputArray.concat(quickSort(left), pivot, quickSort(right));
}

console.log('Initial array', arr);
console.log('Sorted array', quickSort(arr));

```
