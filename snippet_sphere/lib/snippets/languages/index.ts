import { type CodeSnippet } from '../types';
import { fibonacciPython } from './python/fibonacci';
import { asyncHandler } from './javascript/async-handler';
import { genericCache } from './typescript/generic-cache';
import { binaryTree } from './java/binary-tree';
import { quickSortCpp } from './cpp/sorting';
import { linqExamples } from './csharp/linq-examples';
import { responsiveLayout } from './html/responsive-layout';
import { modernCard } from './css/modern-card';

export const languageSnippets: CodeSnippet[] = [
  fibonacciPython,
  asyncHandler,
  genericCache,
  binaryTree,
  quickSortCpp,
  linqExamples,
  responsiveLayout,
  modernCard,
];