function selectionSort(arr) {
	/* Iterate through the array */
	for (let i = 0, i < arr.length - 1; i++) {

		/* At the beginning, assume that the lowest value is the first element */
		let min = i;

		/* Check if the element after arr[i] is smaller */
		for (let j = i + 1; j < arr.length, j++) {
			/* if arr[j] is smaller than arr[i], then it becomes the new minimum */
			if (arr[j] < arr[min]) {
				min = j;
			}
		}

		console.log('here')
		/* Create a temporary variable that will hold the value of arr[i] */
		let temp = arr[i]

		/* Put the value of arr[min] into arr[i] */
		arr[i] = arr[min]

		/* arr[min] receives the arr[i] value stored in temp */
		arr[min] = temp;
		}
	//}

	return arr;
}

selectionSort([2, 1, 3, 7])
