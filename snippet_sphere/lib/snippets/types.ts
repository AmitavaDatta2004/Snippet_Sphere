// Available programming languages
export type Language =
  | 'python'
  | 'javascript'
  | 'typescript'
  | 'java'
  | 'cpp'
  | 'csharp'
  | 'html'
  | 'css';

// Available tags for categorizing snippets
export type Tag =
  // Algorithm categories
  | 'sorting'
  | 'searching'
  | 'graph'
  | 'dynamic-programming'
  | 'greedy'
  | 'recursion'
  | 'backtracking'
  | 'divide-and-conquer'
  
  // Data Structures
  | 'array'
  | 'linked-list'
  | 'stack'
  | 'queue'
  | 'tree'
  | 'binary-tree'
  | 'binary-search-tree'
  | 'heap'
  | 'hash-table'
  | 'graph'
  | 'trie'
  | 'segment-tree'
  
  // Problem Types
  | 'string'
  | 'math'
  | 'bit-manipulation'
  | 'matrix'
  | 'simulation'
  | 'two-pointers'
  | 'sliding-window'
  
  // Difficulty Levels
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  
  // Application Areas
  | 'web'
  | 'database'
  | 'networking'
  | 'security'
  | 'machine-learning'
  | 'data-science'
  | 'system-design'
  
  // Educational
  | 'tutorial'
  | 'example'
  | 'interview'
  | 'competitive-programming'
  | 'leetcode'
  | 'hackerrank'
  | 'project-euler'
  
  // Utilities
  | 'helper'
  | 'utility'
  | 'debugging'
  | 'testing'
  | 'optimization';

export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  language: Language;
  code: string;
  tags: Tag[];
  author: {
    name: string;
    github?: string;
  };
}