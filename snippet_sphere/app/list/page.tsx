'use client';

import { snippets } from '@/lib/snippets';
import { Code2, ChevronDown, ChevronUp, Zap, Database, Globe, Brain, Shield, Trophy } from 'lucide-react';
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
      <div className="group rounded-lg bg-gray-50 dark:bg-gray-700 p-4 transition-all hover:bg-gray-100 dark:hover:bg-gray-600">
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-2">
            <Code2 className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
            <span className="font-medium text-gray-800 dark:text-gray-200">{snippet.title}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {snippet.language}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {snippet.author.name}
              </span>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
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
              <pre className="mt-4 overflow-x-auto rounded-lg bg-gray-800 p-4">
                <code className={`language-${snippet.language} text-sm`}>
                  {snippet.code}
                </code>
              </pre>
              <div className="mt-4 flex flex-wrap gap-2">
                {snippet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-indigo-100 dark:bg-indigo-900 px-3 py-1 text-xs font-medium text-indigo-800 dark:text-indigo-200"
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
      icon: <Zap className="h-6 w-6" />,
      snippets: snippets.filter((s) => 
        ['sorting', 'searching', 'graph', 'dynamic-programming', 'greedy'].some((tag) => 
          s.tags.includes(tag as Tag)
        )
      ),
      gradient: 'from-yellow-400 to-orange-500',
      description: 'Collection of algorithm implementations and problem solutions',
    },
    {
      name: 'Data Structures',
      icon: <Database className="h-6 w-6" />,
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
      icon: <Globe className="h-6 w-6" />,
      snippets: snippets.filter((s) => s.tags.includes('web' as Tag)),
      gradient: 'from-green-400 to-teal-500',
      description: 'Web development utilities and components',
    },
    {
      name: 'Machine Learning',
      icon: <Brain className="h-6 w-6" />,
      snippets: snippets.filter((s) => s.tags.includes('machine-learning' as Tag)),
      gradient: 'from-blue-400 to-indigo-500',
      description: 'Machine learning algorithms and utilities',
    },
    {
      name: 'Security',
      icon: <Shield className="h-6 w-6" />,
      snippets: snippets.filter((s) => s.tags.includes('security' as Tag)),
      gradient: 'from-red-500 to-pink-500',
      description: 'Security-related implementations and utilities',
    },
    {
      name: 'Competitive Programming',
      icon: <Trophy className="h-6 w-6" />,
      snippets: snippets.filter((s) => 
        ['leetcode', 'hackerrank', 'competitive-programming'].some((tag) => 
          s.tags.includes(tag as Tag)
        )
      ),
      gradient: 'from-cyan-400 to-blue-500',
      description: 'Solutions to competitive programming problems',
    },
  ];

  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-4xl sm:text-5xl font-bold text-transparent text-center"
      >
        Code Snippet Explorer
      </motion.h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="rounded-xl border bg-white dark:bg-gray-800 p-6 transition-all hover:shadow-xl hover:scale-105"
          >
            <div className="mb-4 flex items-center space-x-3">
              <div className={`rounded-lg bg-gradient-to-br ${category.gradient} p-3 text-white`}>
                {category.icon}
              </div>
              <div>
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">{category.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{category.description}</p>
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
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 italic">
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

