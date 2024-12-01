import { type CodeSnippet } from '../types';

export const responsiveGrid: CodeSnippet = {
  id: 'responsive-grid',
  title: 'Responsive CSS Grid Layout',
  description: 'A modern responsive grid layout using CSS Grid',
  language: 'css',
  code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.grid-item {
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.grid-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}`,
  tags: ['web', 'css', 'tutorial', 'beginner'],
  author: {
    name: 'Amitava Datta',
    github: 'https://github.com/amitavadatta',
  },
};