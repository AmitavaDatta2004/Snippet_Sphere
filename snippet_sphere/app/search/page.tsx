'use client';

import { useState, useEffect } from 'react';
import { snippets } from '@/lib/snippets';
import { Input } from '@/components/ui/input';
import { SearchIcon, Code2, Github, Plus } from 'lucide-react';
// import * as elasticlunr from 'elasticlunr';
import Link from 'next/link';
import { motion } from 'framer-motion';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import elasticlunr from 'elasticlunr';


export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<typeof snippets>([]);
  const [searchIndex, setSearchIndex] = useState<elasticlunr.Index<any> | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const languages = Array.from(new Set(snippets.map(s => s.language)));
  const authors = Array.from(new Set(snippets.map(s => s.author.name)));
  const tags = Array.from(new Set(snippets.flatMap(s => s.tags)));
  const difficulties = ['beginner', 'intermediate', 'advanced'];
  const categories = [
    'algorithm',
    'data-structure',
    'web',
    'machine-learning',
    'security',
    'competitive',
  ];

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


  useEffect(() => {
    const index = elasticlunr(function (this: elasticlunr.Index<any>) {
      this.addField('title');
      this.addField('description');
      this.addField('tags');
      this.setRef('id');
    });
    

    snippets.forEach((snippet) => {
      index.addDoc({
        id: snippet.id,
        title: snippet.title,
        description: snippet.description,
        tags: snippet.tags.join(' '),
      });
    });

    setSearchIndex(index);
    setSearchResults(snippets);

    hljs.configure({
      languages: ['cpp', 'csharp', 'c', 'java', 'python', 'javascript', 'typescript', 'html', 'css']
    });
  }, []);

  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block as HTMLElement);
    });    
  }, [searchResults]);

  useEffect(() => {
    let filteredResults = snippets;

    if (searchIndex && searchTerm) {
      const searchResults = searchIndex
        .search(searchTerm, { expand: true })
        .map((result) => snippets.find((s) => s.id === result.ref))
        .filter(Boolean) as typeof snippets;
      filteredResults = searchResults;
    }

    if (selectedLanguage !== 'all') {
      filteredResults = filteredResults.filter(s => s.language === selectedLanguage);
    }

    if (selectedAuthor !== 'all') {
      filteredResults = filteredResults.filter(s => s.author.name === selectedAuthor);
    }

    if (selectedTag !== 'all') {
      filteredResults = filteredResults.filter(s => s.tags.includes(selectedTag as Tag));
    }

    if (selectedDifficulty !== 'all') {
      filteredResults = filteredResults.filter(s => s.tags.includes(selectedDifficulty as Tag));
    }

    if (selectedCategory !== 'all') {
      filteredResults = filteredResults.filter(s => s.tags.includes(selectedCategory as Tag));
    }

    setSearchResults(filteredResults);
  }, [searchTerm, searchIndex, selectedLanguage, selectedAuthor, selectedTag, selectedDifficulty, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-4xl sm:text-5xl font-extrabold text-transparent">
            Discover Code Snippets
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find the perfect code snippet to elevate your project
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search by title, description, or tags..."
              className="pl-10 w-full h-12 text-lg rounded-full border-2 border-purple-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="bg-white dark:bg-gray-800 border-2 border-purple-300 rounded-lg h-12">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-white dark:bg-gray-800 border-2 border-purple-300 rounded-lg h-12">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="bg-white dark:bg-gray-800 border-2 border-purple-300 rounded-lg h-12">
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
              <SelectTrigger className="bg-white dark:bg-gray-800 border-2 border-purple-300 rounded-lg h-12">
                <SelectValue placeholder="Select Author" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Authors</SelectItem>
                {authors.map((author) => (
                  <SelectItem key={author} value={author}>
                    {author}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="bg-white dark:bg-gray-800 border-2 border-purple-300 rounded-lg h-12">
                <SelectValue placeholder="Select Tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {tags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {searchResults.map((snippet, index) => (
            <motion.div
              key={snippet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 transition-all hover:shadow-xl hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Code2 className="h-5 w-5 text-indigo-500" />
                      <span className="font-bold text-lg text-gray-800 dark:text-white">
                        {snippet.title}
                      </span>
                    </div>
                    <span className="rounded-full bg-indigo-100 dark:bg-indigo-900 px-3 py-1 text-sm font-medium text-indigo-800 dark:text-indigo-200">
                      {snippet.language}
                    </span>
                  </div>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    {snippet.description}
                  </p>
                  <pre className="mb-4 overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-900 p-4">
                    <code className={`language-${snippet.language} text-sm`}>
                      {snippet.code}
                    </code>
                  </pre>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {snippet.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-purple-100 dark:bg-purple-900 px-3 py-1 text-xs font-medium text-purple-800 dark:text-purple-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">By:</span>
                      <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{snippet.author.name}</span>
                    </div>
                    <a
                      href={snippet.author.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {searchResults.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12"
          >
            <div className="rounded-2xl bg-white dark:bg-gray-800 p-8 text-center shadow-lg">
              <div className="mb-6 flex justify-center">
                <Plus className="h-16 w-16 text-indigo-500" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">No Results Found</h3>
              <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                Couldn't find what you're looking for? Help us grow our collection!
              </p>
              
              <Button
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg py-3 px-6 rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                onClick={() => window.open('https://github.com/amitavadatta/code-showcase', '_blank')}
              >
                <Github className="mr-2 h-5 w-5" />
                Contribute on GitHub
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

