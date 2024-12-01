import { type CodeSnippet } from '../../types';

export const asyncHandler: CodeSnippet = {
  id: 'async-handler-js',
  title: 'Async Error Handler',
  description: 'Utility function for handling async/await errors in Express',
  language: 'javascript',
  code: `const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    });
};

// Example usage
app.get('/api/users', asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json({ success: true, data: users });
}));`,
  tags: ['web', 'utility', 'error-handling', 'intermediate'],
  author: {
    name: 'Pranay De',
    github: 'https://github.com/pranayde',
  },
};