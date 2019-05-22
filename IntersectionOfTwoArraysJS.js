// Problem: Given two unsorted arrays, write a function to compute their intersection
// Input: nums1 = [1,2,2,1], nums2 = [2,2]
// Output: [2,2]
// Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// Output: [4,9]
// Input: nums1 = [1,2,3,1], nums2 = [2]
// Output: [2]

/**
 * 
 * @param {number[]} nums1 
 * @param {number[]} nums2 
 */

 // primary function to compute intersection of two arrays
const intersect = (nums1, nums2) => {
    // this will be the variable that I return that contains the array with the intersecting elements
    const results = [];

    // sort one of the arrays, it doesn't matter which, as long as you know which one is sorted
    // in this case, I randomly chose nums2 to be the array that I sorted
    // remember that the built in javascript method Array.prototype.sort() sorts an array in place
    nums2.sort((a,b) => a-b);

    // loop through the non-sorted array (nums1 in my case)
    // compute the binary search method on the sorted array nums2 for the target element(nums1[i])
    // if binary search method returns an index greater or equal t0 0
    // use that index to push up the element to results variable and at the same time, deleting it from nums2, so we don't count it twice
    for (let i=0; i<nums1.length; i++) {
        let index = findIndexBS(nums2, nums1[i], 0, nums2.length);
        if (index >= 0) {
            results.push(nums2.splice(index, 1))
        }
    }

    return results;
}

// supporting function to compute the binary search method using recursion on the target index
// binary search method allows us to find a target element in an array much faster than sequential search method
// it works using the midPoint of a sorted array like so:
// if the element at index midPoint is greater than the target element, then search the left side of the sorted array (nums2)
// because we know that every element on the right side forward of the midPoint is greater than the target
// if element at index midPoint is less than the target element, then search right side of the sorted array (nums2)
// because we know every element on the left side of from the midPoint is less than the target
const findIndexBS = (arr, target, start, end) => {
    // base case for recursion
    // this case will be reached when nums2 array does not contain the target element
    // -1 is traditionally used as false in javascript
    if (start > end) {
        return -1;
    }

    // calculate the midPoint using Math.floor() method to round down
    const midPoint = Math.floor((start + end) / 2);

    // second base case to return the index where target exists in nums2 array
    if (arr[midPoint] === target) {
        return midPoint;
    }

    // if the element at index midPoint is greater than the target element, then search the left side of the sorted array (nums2) excluding the midPoint
    if (arr[midPoint] > target) {
        return findIndexBS(arr, target, start, midPoint-1);
    // if element at index midPoint is less than the target element, then search right side of the sorted array (nums2) from the midPoint
    } else {
        return findIndexBS(arr, target, midPoint+1, end);
    }
}