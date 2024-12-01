import { type CodeSnippet } from '../../types';

export const genericCache: CodeSnippet = {
  id: 'generic-cache-ts',
  title: 'Generic Cache Implementation',
  description: 'Type-safe caching utility using TypeScript generics',
  language: 'typescript',
  code: `class Cache<T> {
  private cache: Map<string, { data: T; timestamp: number }>;
  private ttl: number;

  constructor(ttlSeconds: number = 3600) {
    this.cache = new Map();
    this.ttl = ttlSeconds * 1000;
  }

  set(key: string, value: T): void {
    this.cache.set(key, {
      data: value,
      timestamp: Date.now(),
    });
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const isExpired = Date.now() - item.timestamp > this.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

// Example usage
const userCache = new Cache<User>();
userCache.set('user1', { id: 1, name: 'John' });`,
  tags: ['utility', 'advanced', 'data-structure'],
  author: {
    name: 'Amitava Datta',
    github: 'https://github.com/amitavadatta',
  },
};