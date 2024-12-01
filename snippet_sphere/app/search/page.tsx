'use client';

import { useState, useEffect } from 'react';
import { snippets } from '@/lib/snippets';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon, Code2, Github, Plus } from 'lucide-react';
import * as elasticlunr from 'elasticlunr';
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

  useEffect(() => {
    const index = elasticlunr(function () {
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

    // Initialize highlight.js
    hljs.configure({
      languages: ['cpp', 'csharp', 'c', 'java', 'python', 'javascript', 'typescript', 'html', 'css']
    });
  }, []);

  useEffect(() => {
    // Highlight code blocks after results update
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
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
      filteredResults = filteredResults.filter(s => s.tags.includes(selectedTag));
    }

    if (selectedDifficulty !== 'all') {
      filteredResults = filteredResults.filter(s => s.tags.includes(selectedDifficulty));
    }

    if (selectedCategory !== 'all') {
      filteredResults = filteredResults.filter(s => s.tags.includes(selectedCategory));
    }

    setSearchResults(filteredResults);
  }, [searchTerm, searchIndex, selectedLanguage, selectedAuthor, selectedTag, selectedDifficulty, selectedCategory]);

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-3xl font-bold text-transparent">
          Search Code Snippets
        </h1>
        <p className="text-muted-foreground">
          Find the perfect code snippet for your project
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 space-y-4"
      >
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by title, description, or tags..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="bg-card">
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
            <SelectTrigger className="bg-card">
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
            <SelectTrigger className="bg-card">
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
            <SelectTrigger className="bg-card">
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
            <SelectTrigger className="bg-card">
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
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {searchResults.map((snippet, index) => (
          <motion.div
            key={snippet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="group relative overflow-hidden rounded-lg border bg-card p-4 transition-all hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Code2 className="h-4 w-4" />
                    <span className="font-semibold">
                      {snippet.title}
                    </span>
                  </div>
                  <span className="rounded bg-primary/10 px-2 py-1 text-xs">
                    {snippet.language}
                  </span>
                </div>
                <p className="mb-2 text-sm text-muted-foreground">
                  {snippet.description}
                </p>
                <pre className="mb-2 overflow-x-auto rounded-lg bg-muted p-4">
                  <code className={`language-${snippet.language}`}>
                    {snippet.code}
                  </code>
                </pre>
                <div className="flex flex-wrap gap-2">
                  {snippet.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-2 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">By:</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-primary">{snippet.author.name}</span>
                    <a
                      href={snippet.author.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </div>
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
          className="mt-8"
        >
          <div className="rounded-lg border bg-card p-8 text-center">
            <div className="mb-4 flex justify-center">
              <Plus className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">No Results Found</h3>
            <p className="mb-4 text-muted-foreground">
              Couldn't find what you're looking for? Contribute to our GitHub repository!
            </p>
            
            <Button
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
              onClick={() => window.open('https://github.com/amitavadatta/code-showcase', '_blank')}
            >
              <Github className="mr-2 h-4 w-4" />
              Contribute on GitHub
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}