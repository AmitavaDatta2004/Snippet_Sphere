import { type CodeSnippet } from '../types';
import { passwordHash } from './password-hash';

export const securitySnippets: CodeSnippet[] = [
  passwordHash,
];