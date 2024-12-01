'use client';

import { useState, useEffect } from 'react';
import { snippets } from '@/lib/snippets';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Copy, Github, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

export default function SnippetsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    hljs.configure({
      languages: ['cpp', 'csharp', 'c', 'java', 'python', 'javascript', 'typescript', 'html', 'css'],
    });
  
    document.querySelectorAll('pre code').forEach((block) => {
      if (block instanceof HTMLElement) {
        hljs.highlightBlock(block); // Ensure the type is HTMLElement
      }
    });
  }, [selectedLanguage]);
  

  const filteredSnippets = selectedLanguage
    ? snippets.filter((snippet) => snippet.language === selectedLanguage)
    : snippets;

  const languages = Array.from(
    new Set(snippets.map((snippet) => snippet.language))
  );

  const copyToClipboard = async (code: string) => {
    await navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-indigo-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-4xl sm:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
        >
          Code Snippets Gallery
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex flex-wrap justify-center gap-3"
        >
          <Button
            variant={selectedLanguage === null ? 'default' : 'outline'}
            onClick={() => setSelectedLanguage(null)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
          >
            All
          </Button>
          {languages.map((language) => (
            <Button
              key={language}
              variant={selectedLanguage === language ? 'default' : 'outline'}
              onClick={() => setSelectedLanguage(language)}
              className={`
                transition-all duration-300 transform hover:scale-105
                ${selectedLanguage === language
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600'
                  : 'bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                }
              `}
            >
              {language}
            </Button>
          ))}
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSnippets.map((snippet, index) => (
            <motion.div
              key={snippet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
                      <Code2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white">{snippet.title}</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {snippet.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(snippet.code)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Copy className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </Button>
                </div>
                <div className="relative overflow-hidden rounded-lg">
                  <pre className="overflow-x-auto p-4 bg-gray-900 text-white">
                    <code className={`language-${snippet.language} text-sm`}>{snippet.code}</code>
                  </pre>
                </div>
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
                <div className="mt-4 flex items-center justify-between">
                  <a
                    href={snippet.author.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <span>{snippet.author.name}</span>
                    <Github className="h-4 w-4" />
                  </a>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {snippet.language}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

