import { type CodeSnippet } from '../types';

export const binarySearch: CodeSnippet = {
  id: 'binary-search',
  title: 'Binary Search Implementation',
  description: 'Efficient binary search algorithm for sorted arrays',
  language: 'javascript',
  code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    }
    
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`,
  tags: ['searching', 'algorithm', 'array', 'interview', 'beginner'],
  author: {
    name: 'Amitava Datta',
    github: 'https://github.com/AmitavaDatta2004',
  },
};