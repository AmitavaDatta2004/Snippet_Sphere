import { type CodeSnippet } from '../types';
import { bubbleSort } from './bubble-sort';
import { quickSort } from './quick-sort';
import { mergeSort } from './merge-sort';

export const sortingSnippets: CodeSnippet[] = [
  bubbleSort,
  quickSort,
  mergeSort,
];