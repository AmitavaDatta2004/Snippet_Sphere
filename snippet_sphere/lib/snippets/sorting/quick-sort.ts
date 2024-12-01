import { type CodeSnippet } from '../types';

export const quickSort: CodeSnippet = {
  id: 'quick-sort',
  title: 'Quick Sort Implementation',
  description: 'An efficient implementation of the quick sort algorithm',
  language: 'python',
  code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)`,
  tags: ['sorting', 'algorithm'],
  author: {
    name: 'Pranay De',
    github: 'https://github.com/pranayde',
  },
};