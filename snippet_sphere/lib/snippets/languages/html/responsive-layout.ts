import { type CodeSnippet } from '../../types';

export const responsiveLayout: CodeSnippet = {
  id: 'responsive-layout-html',
  title: 'Responsive HTML Layout',
  description: 'Modern responsive layout using HTML5 semantic elements',
  language: 'html',
  code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Layout</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="hero">
            <h1>Welcome to Our Site</h1>
            <p>Discover amazing content</p>
        </section>

        <section id="features">
            <article>
                <h2>Feature 1</h2>
                <p>Description of feature 1</p>
            </article>
            <article>
                <h2>Feature 2</h2>
                <p>Description of feature 2</p>
            </article>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 Your Company</p>
    </footer>
</body>
</html>`,
  tags: ['web', 'beginner', 'tutorial'],
  author: {
    name: 'Amitava Datta',
    github: 'https://github.com/AmitavaDatta2004',
  },
};