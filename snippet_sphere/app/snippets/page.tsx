'use client';

import { useState, useEffect } from 'react';
import { snippets } from '@/lib/snippets';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Copy, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

export default function SnippetsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Initialize highlight.js
    hljs.configure({
      languages: ['cpp', 'csharp', 'c', 'java', 'python', 'javascript', 'typescript', 'html', 'css']
    });
    
    // Highlight all code blocks
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
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
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Code Snippets</h1>
      
      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          variant={selectedLanguage === null ? 'default' : 'outline'}
          onClick={() => setSelectedLanguage(null)}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
        >
          All
        </Button>
        {languages.map((language) => (
          <Button
            key={language}
            variant={selectedLanguage === language ? 'default' : 'outline'}
            onClick={() => setSelectedLanguage(language)}
            className={
              selectedLanguage === language
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600'
                : ''
            }
          >
            {language}
          </Button>
        ))}
      </div>

      <div className="grid gap-6">
        {filteredSnippets.map((snippet, index) => (
          <motion.div
            key={snippet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{snippet.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {snippet.description}
                </p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">By:</span>
                  <a
                    href={snippet.author.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-sm text-primary hover:underline"
                  >
                    <span>{snippet.author.name}</span>
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(snippet.code)}
                className="opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <pre className="relative overflow-x-auto rounded-lg bg-muted p-4">
              <code className={`language-${snippet.language}`}>{snippet.code}</code>
            </pre>
            <div className="mt-4 flex flex-wrap gap-2">
              {snippet.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}