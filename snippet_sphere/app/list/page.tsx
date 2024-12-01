'use client';

import { snippets } from '@/lib/snippets';
import { Code2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { useEffect, useState } from 'react';

type Tag =
  | 'sorting'
  | 'searching'
  | 'graph'
  | 'dynamic-programming'
  | 'greedy'
  | 'array'
  | 'linked-list'
  | 'stack'
  | 'queue'
  | 'tree'
  | 'web'
  | 'machine-learning'
  | 'security'
  | 'leetcode'
  | 'hackerrank'
  | 'competitive-programming';

interface Snippet {
  id: string;
  title: string;
  language: string;
  description: string;
  code: string;
  tags: Tag[]; // Ensure tags match the Tag type
  author: { name: string };
}
interface Category {
  name: string;
  icon: JSX.Element;
  snippets: typeof snippets;
  gradient: string;
  description: string;
}

interface SnippetCardProps {
  snippet: (typeof snippets)[0];
  categoryIndex: number;
  snippetIndex: number;
}

function SnippetCard({ snippet, categoryIndex, snippetIndex }: SnippetCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      hljs.highlightAll();
    }
  }, [isExpanded]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: (categoryIndex + snippetIndex) * 0.1 }}
    >
      <div className="group rounded-lg border bg-card/50 p-4 transition-all hover:bg-accent">
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-2">
            <Code2 className="h-4 w-4" />
            <span className="font-medium">{snippet.title}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {snippet.language}
              </span>
              <span className="text-sm text-muted-foreground">
                {snippet.author.name}
              </span>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {snippet.description}
        </p>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <pre className="mt-4 overflow-x-auto rounded-lg bg-muted p-4">
                <code className={`language-${snippet.language}`}>
                  {snippet.code}
                </code>
              </pre>
              <div className="mt-4 flex flex-wrap gap-2">
                {snippet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ListPage() {
  const categories: Category[] = [
    {
      name: 'Algorithms',
      icon: <Code2 className="h-5 w-5" />,
      snippets: snippets.filter((s) => 
        ['sorting', 'searching', 'graph', 'dynamic-programming', 'greedy'].some((tag) => 
          s.tags.includes(tag as Tag) // Ensure tag is treated as a 'Tag'
        )
      ),
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Collection of algorithm implementations and problem solutions',
    },
    {
      name: 'Data Structures',
      icon: <Code2 className="h-5 w-5" />,
      snippets: snippets.filter((s) => 
        ['array', 'linked-list', 'stack', 'queue', 'tree', 'graph'].some((tag) => 
          s.tags.includes(tag as Tag)
        )
      ),
      gradient: 'from-purple-500 to-pink-500',
      description: 'Implementation of various data structures',
    },
    {
      name: 'Web Development',
      icon: <Code2 className="h-5 w-5" />,
      snippets: snippets.filter((s) => s.tags.includes('web' as Tag)),
      gradient: 'from-green-500 to-emerald-500',
      description: 'Web development utilities and components',
    },
    {
      name: 'Machine Learning',
      icon: <Code2 className="h-5 w-5" />,
      snippets: snippets.filter((s) => s.tags.includes('machine-learning' as Tag)),
      gradient: 'from-orange-500 to-red-500',
      description: 'Machine learning algorithms and utilities',
    },
    {
      name: 'Security',
      icon: <Code2 className="h-5 w-5" />,
      snippets: snippets.filter((s) => s.tags.includes('security' as Tag)),
      gradient: 'from-indigo-500 to-purple-500',
      description: 'Security-related implementations and utilities',
    },
    {
      name: 'Competitive Programming',
      icon: <Code2 className="h-5 w-5" />,
      snippets: snippets.filter((s) => 
        ['leetcode', 'hackerrank', 'competitive-programming'].some((tag) => 
          s.tags.includes(tag as Tag)
        )
      ),
      gradient: 'from-pink-500 to-rose-500',
      description: 'Solutions to competitive programming problems',
    },
  ];

  return (
    <div className="container py-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-3xl font-bold text-transparent"
      >
        Browse by Category
      </motion.h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="rounded-lg border bg-card p-6 transition-all hover:shadow-lg"
          >
            <div className="mb-4 flex items-center space-x-2">
              <div className={`rounded-lg bg-gradient-to-br ${category.gradient} p-2 text-white`}>
                {category.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            </div>
            <div className="space-y-3">
              {category.snippets.map((snippet, snippetIndex) => (
                <SnippetCard
                  key={snippet.id}
                  snippet={snippet}
                  categoryIndex={categoryIndex}
                  snippetIndex={snippetIndex}
                />
              ))}
              {category.snippets.length === 0 && (
                <p className="text-center text-sm text-muted-foreground">
                  No snippets in this category yet
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}