import { type CodeSnippet } from '../types';

export const bubbleSort: CodeSnippet = {
  id: 'bubble-sort',
  title: 'Bubble Sort Implementation',
  description: 'A simple implementation of the bubble sort algorithm with detailed comments',
  language: 'python',
  code: `def bubble_sort(arr):
    """
    Sorts an array using the bubble sort algorithm.
    Time Complexity: O(n²)
    Space Complexity: O(1)
    """
    n = len(arr)
    for i in range(n):
        # Flag to optimize for already sorted arrays
        swapped = False
        
        # Last i elements are already in place
        for j in range(0, n - i - 1):
            # Compare adjacent elements
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # If no swapping occurred, array is already sorted
        if not swapped:
            break
            
    return arr`,
  tags: [
    'sorting',
    'algorithm',
    'beginner',
    'array',
    'tutorial',
    'interview',
  ],
  author: {
    name: 'Amitava Datta',
    github: 'https://github.com/amitavadatta',
  },
};