import { type CodeSnippet } from '../../types';

export const quickSortCpp: CodeSnippet = {
  id: 'quicksort-cpp',
  title: 'QuickSort Implementation',
  description: 'Efficient QuickSort algorithm implementation in C++',
  language: 'cpp',
  code: `template<typename T>
void quickSort(T arr[], int low, int high) {
    if (low < high) {
        // Partition the array
        T pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                std::swap(arr[i], arr[j]);
            }
        }
        std::swap(arr[i + 1], arr[high]);
        
        int pi = i + 1;
        
        // Recursively sort sub-arrays
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// Example usage
int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    quickSort(arr, 0, n - 1);
    
    std::cout << "Sorted array: ";
    for (int i = 0; i < n; i++)
        std::cout << arr[i] << " ";
    return 0;
}`,
  tags: ['sorting', 'algorithm', 'advanced', 'template'],
  author: {
    name: 'Amitava Datta',
    github: 'https://github.com/amitavadatta',
  },
};