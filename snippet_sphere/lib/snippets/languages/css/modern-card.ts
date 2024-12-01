import { type CodeSnippet } from '../../types';

export const modernCard: CodeSnippet = {
  id: 'modern-card-css',
  title: 'Modern Card Design',
  description: 'Stylish card component with hover effects using CSS',
  language: 'css',
  code: `.card {
  background: var(--card-bg, #ffffff);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

.card:hover::before {
  opacity: 1;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--title-color, #1a1a1a);
}

.card-content {
  font-size: 1rem;
  line-height: 1.5;
  color: var(--content-color, #4a4a4a);
}

@media (prefers-color-scheme: dark) {
  .card {
    --card-bg: #1a1a1a;
    --title-color: #ffffff;
    --content-color: #a0a0a0;
  }
}`,
  tags: ['web', 'css', 'design', 'beginner'],
  author: {
    name: 'Pranay De',
    github: 'https://github.com/pranayde',
  },
};