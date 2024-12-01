import { type CodeSnippet } from './types';
import { sortingSnippets } from './sorting';
import { dataStructureSnippets } from './data-structures';
import { algorithmSnippets } from './algorithms';
import { languageSnippets } from './languages';

export const snippets: CodeSnippet[] = [
  ...sortingSnippets,
  ...dataStructureSnippets,
  ...algorithmSnippets,
  ...languageSnippets,
];