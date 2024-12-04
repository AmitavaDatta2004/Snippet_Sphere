# Contributing to Code Showcase

Thank you for your interest in contributing to Code Showcase! This document provides guidelines and instructions for contributing code snippets and improvements to our repository.

## How to Contribute Code Snippets

### File Structure
All code snippets are located in the `/lib/snippets` directory, organized by categories:
```
lib/snippets/
├── algorithms/
├── data-structures/
├── languages/
│   ├── cpp/
│   ├── csharp/
│   ├── java/
│   ├── javascript/
│   ├── python/
│   ├── typescript/
│   ├── html/
│   └── css/
├── security/
├── web/
└── types.ts
```

### Adding a New Snippet

1. Choose the appropriate category directory for your snippet
2. Create a new file with a descriptive name (e.g., `quick-sort.ts` for a quicksort implementation)
3. Follow this template for your snippet:

```typescript
import { type CodeSnippet } from '../types';

export const yourSnippetName: CodeSnippet = {
  id: 'unique-id',
  title: 'Descriptive Title',
  description: 'Clear and concise description',
  language: 'language-name', // must match one from Language type
  code: `Your code here`,
  tags: ['relevant', 'tags'], // must match from Tag type
  author: {
    name: 'Your Name',
    github: 'https://github.com/yourusername',
  },
};
```

4. Import and export your snippet in the category's index.ts file

### Code Quality Guidelines

1. **Code Style**
   - Use consistent indentation (2 spaces)
   - Include meaningful comments
   - Follow language-specific best practices
   - Ensure code is properly formatted

2. **Documentation**
   - Clear title and description
   - Relevant tags for searchability
   - Proper code comments explaining complex logic

3. **Tags**
   - Use existing tags from `types.ts`
   - Tags should accurately reflect:
     - Difficulty level (beginner/intermediate/advanced)
     - Category (algorithm/data-structure/etc.)
     - Topic (sorting/searching/etc.)
     - Purpose (tutorial/interview/etc.)

### Pull Request Process

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Add your snippet following the guidelines above
4. Test locally:
   ```bash
   npm install
   npm run dev
   ```
5. Commit your changes:
   ```bash
   git add .
   git commit -m "Add: Brief description of your addition"
   ```
6. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. Create a Pull Request with:
   - Clear title and description
   - Reference any related issues
   - List of changes made

### Avoid Merge Conflicts

1. Always pull the latest changes from main before creating a branch:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```

2. Keep your fork updated:
   ```bash
   git remote add upstream https://github.com/amitavadatta/code-showcase
   git fetch upstream
   git merge upstream/main
   ```

3. Resolve conflicts locally before pushing:
   ```bash
   git merge main
   # Resolve any conflicts
   git add .
   git commit -m "Merge main and resolve conflicts"
   ```

## Code Review Process

1. All contributions will be reviewed for:
   - Code quality and style
   - Documentation completeness
   - Proper categorization and tagging
   - Potential duplicates

2. Reviewers may request changes for:
   - Code improvements
   - Better documentation
   - Tag adjustments
   - File organization

## Getting Help

- Create an issue for questions
- Join our discussions
- Tag maintainers for urgent queries

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow project conventions

Thank you for contributing to Code Showcase! Your contributions help make this resource better for everyone.